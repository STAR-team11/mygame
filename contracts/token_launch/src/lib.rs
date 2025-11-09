#![no_std]

mod storage;
use storage::{DataKey, Participation, Project, VestingSchedule};

use soroban_sdk::{contract, contractimpl, token, Address, Env, String, Vec};

#[contract]
pub struct TokenLaunch;

#[contractimpl]
impl TokenLaunch {
    pub fn initialize(env: Env, admin: Address, star_token: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }

        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::StarToken, &star_token);
        env.storage().instance().set(&DataKey::ProjectCounter, &0u64);
    }

    pub fn create_project(
        env: Env,
        creator: Address,
        name: String,
        symbol: String,
        token_address: Address,
        total_supply: i128,
        airdrop_allocation: i128,
        liquidity_allocation: i128,
        team_allocation: i128,
        target_amount: i128,
        price_per_token: i128,
        min_contribution: i128,
        max_contribution: i128,
        start_time: u64,
        end_time: u64,
        vesting_duration: u64,
        vesting_cliff: u64,
    ) -> u64 {
        creator.require_auth();

        if total_supply <= 0 {
            panic!("Total supply must be positive");
        }

        if airdrop_allocation + liquidity_allocation + team_allocation > total_supply {
            panic!("Allocations exceed total supply");
        }

        if start_time >= end_time {
            panic!("Invalid time range");
        }

        if price_per_token <= 0 {
            panic!("Price must be positive");
        }

        let mut counter: u64 = env
            .storage()
            .instance()
            .get(&DataKey::ProjectCounter)
            .unwrap_or(0);
        counter += 1;

        let project = Project {
            id: counter,
            creator: creator.clone(),
            name,
            symbol,
            token_address,
            total_supply,
            airdrop_allocation,
            liquidity_allocation,
            team_allocation,
            total_raised: 0,
            target_amount,
            price_per_token,
            min_contribution,
            max_contribution,
            start_time,
            end_time,
            vesting_start: end_time,
            vesting_duration,
            vesting_cliff,
            is_active: true,
            is_finalized: false,
        };

        env.storage().persistent().set(&DataKey::Project(counter), &project);
        env.storage().instance().set(&DataKey::ProjectCounter, &counter);

        counter
    }

    pub fn mint_star_points(env: Env, to: Address, amount: i128) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        if amount <= 0 {
            panic!("Amount must be positive");
        }

        let current_balance = Self::get_star_points(env.clone(), to.clone());
        let new_balance = current_balance + amount;

        env.storage()
            .persistent()
            .set(&DataKey::UserStarPoints(to.clone()), &new_balance);
    }

    pub fn participate_in_project(
        env: Env,
        project_id: u64,
        participant: Address,
        amount: i128,
        star_points_to_use: i128,
    ) {
        participant.require_auth();

        if amount <= 0 {
            panic!("Amount must be positive");
        }

        let mut project: Project = env
            .storage()
            .persistent()
            .get(&DataKey::Project(project_id))
            .expect("Project not found");

        if !project.is_active {
            panic!("Project is not active");
        }

        let current_time = env.ledger().timestamp();
        if current_time < project.start_time || current_time > project.end_time {
            panic!("Project not in valid time range");
        }

        if amount < project.min_contribution {
            panic!("Below minimum contribution");
        }

        if amount > project.max_contribution {
            panic!("Exceeds maximum contribution");
        }

        if star_points_to_use > 0 {
            let user_star_points = Self::get_star_points(env.clone(), participant.clone());
            if user_star_points < star_points_to_use {
                panic!("Insufficient STAR points");
            }

            let new_balance = user_star_points - star_points_to_use;
            env.storage()
                .persistent()
                .set(&DataKey::UserStarPoints(participant.clone()), &new_balance);
        }

        let effective_amount = amount + star_points_to_use;
        let tokens_allocated = (effective_amount * 10_000_000) / project.price_per_token;

        let mut participation = env
            .storage()
            .persistent()
            .get(&DataKey::Participation(project_id, participant.clone()))
            .unwrap_or(Participation {
                participant: participant.clone(),
                amount_contributed: 0,
                tokens_allocated: 0,
                tokens_claimed: 0,
                star_points_used: 0,
                last_claim_time: 0,
            });

        participation.amount_contributed += amount;
        participation.tokens_allocated += tokens_allocated;
        participation.star_points_used += star_points_to_use;

        env.storage().persistent().set(
            &DataKey::Participation(project_id, participant.clone()),
            &participation,
        );

        project.total_raised += effective_amount;
        env.storage().persistent().set(&DataKey::Project(project_id), &project);
    }

    pub fn claim_tokens(env: Env, project_id: u64, participant: Address) -> i128 {
        participant.require_auth();

        let project: Project = env
            .storage()
            .persistent()
            .get(&DataKey::Project(project_id))
            .expect("Project not found");

        if !project.is_finalized {
            panic!("Project not finalized");
        }

        let mut participation: Participation = env
            .storage()
            .persistent()
            .get(&DataKey::Participation(project_id, participant.clone()))
            .expect("No participation found");

        let current_time = env.ledger().timestamp();
        let vesting_start = project.vesting_start;
        let cliff_end = vesting_start + project.vesting_cliff;

        if current_time < cliff_end {
            panic!("Cliff period not ended");
        }

        let elapsed_time = current_time.saturating_sub(vesting_start);
        let vested_amount = if elapsed_time >= project.vesting_duration {
            participation.tokens_allocated
        } else {
            (participation.tokens_allocated * elapsed_time as i128)
                / project.vesting_duration as i128
        };

        let claimable_amount = vested_amount - participation.tokens_claimed;

        if claimable_amount <= 0 {
            panic!("No tokens to claim");
        }

        participation.tokens_claimed += claimable_amount;
        participation.last_claim_time = current_time;

        env.storage().persistent().set(
            &DataKey::Participation(project_id, participant.clone()),
            &participation,
        );

        let token_client = token::Client::new(&env, &project.token_address);
        token_client.transfer(
            &env.current_contract_address(),
            &participant,
            &claimable_amount,
        );

        claimable_amount
    }

    pub fn finalize_project(env: Env, project_id: u64) {
        let mut project: Project = env
            .storage()
            .persistent()
            .get(&DataKey::Project(project_id))
            .expect("Project not found");

        project.creator.require_auth();

        let current_time = env.ledger().timestamp();
        if current_time < project.end_time {
            panic!("Project not ended yet");
        }

        if project.is_finalized {
            panic!("Already finalized");
        }

        project.is_finalized = true;
        project.is_active = false;
        project.vesting_start = current_time;

        env.storage().persistent().set(&DataKey::Project(project_id), &project);
    }

    pub fn distribute_airdrop(
        env: Env,
        project_id: u64,
        recipients: Vec<Address>,
        amounts: Vec<i128>,
    ) {
        let project: Project = env
            .storage()
            .persistent()
            .get(&DataKey::Project(project_id))
            .expect("Project not found");

        project.creator.require_auth();

        if recipients.len() != amounts.len() {
            panic!("Mismatched arrays");
        }

        let token_client = token::Client::new(&env, &project.token_address);

        for i in 0..recipients.len() {
            let recipient = recipients.get(i).unwrap();
            let amount = amounts.get(i).unwrap();

            if amount > 0 {
                token_client.transfer(&env.current_contract_address(), &recipient, &amount);
            }
        }
    }

    pub fn get_project(env: Env, project_id: u64) -> Project {
        env.storage()
            .persistent()
            .get(&DataKey::Project(project_id))
            .expect("Project not found")
    }

    pub fn get_participation(env: Env, project_id: u64, participant: Address) -> Participation {
        env.storage()
            .persistent()
            .get(&DataKey::Participation(project_id, participant))
            .unwrap_or(Participation {
                participant: participant.clone(),
                amount_contributed: 0,
                tokens_allocated: 0,
                tokens_claimed: 0,
                star_points_used: 0,
                last_claim_time: 0,
            })
    }

    pub fn get_star_points(env: Env, user: Address) -> i128 {
        env.storage()
            .persistent()
            .get(&DataKey::UserStarPoints(user))
            .unwrap_or(0)
    }

    pub fn get_project_count(env: Env) -> u64 {
        env.storage()
            .instance()
            .get(&DataKey::ProjectCounter)
            .unwrap_or(0)
    }

    pub fn get_admin(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Admin).unwrap()
    }

    pub fn get_star_token(env: Env) -> Address {
        env.storage().instance().get(&DataKey::StarToken).unwrap()
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_initialize() {
        let env = Env::default();
        let contract_id = env.register_contract(None, TokenLaunch);
        let client = TokenLaunchClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let star_token = Address::generate(&env);

        env.mock_all_auths();

        client.initialize(&admin, &star_token);

        assert_eq!(client.get_admin(), admin);
        assert_eq!(client.get_star_token(), star_token);
    }

    #[test]
    fn test_mint_star_points() {
        let env = Env::default();
        let contract_id = env.register_contract(None, TokenLaunch);
        let client = TokenLaunchClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let star_token = Address::generate(&env);
        let user = Address::generate(&env);

        env.mock_all_auths();

        client.initialize(&admin, &star_token);
        client.mint_star_points(&user, &1000);

        assert_eq!(client.get_star_points(&user), 1000);
    }
}
