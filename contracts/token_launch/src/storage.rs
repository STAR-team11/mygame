use soroban_sdk::{contracttype, Address, String, Vec};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    StarToken,
    ProjectCounter,
    Project(u64),
    Participation(u64, Address),
    UserStarPoints(Address),
}

#[derive(Clone)]
#[contracttype]
pub struct Project {
    pub id: u64,
    pub creator: Address,
    pub name: String,
    pub symbol: String,
    pub token_address: Address,
    pub total_supply: i128,
    pub airdrop_allocation: i128,
    pub liquidity_allocation: i128,
    pub team_allocation: i128,
    pub total_raised: i128,
    pub target_amount: i128,
    pub price_per_token: i128,
    pub min_contribution: i128,
    pub max_contribution: i128,
    pub start_time: u64,
    pub end_time: u64,
    pub vesting_start: u64,
    pub vesting_duration: u64,
    pub vesting_cliff: u64,
    pub is_active: bool,
    pub is_finalized: bool,
}

#[derive(Clone)]
#[contracttype]
pub struct Participation {
    pub participant: Address,
    pub amount_contributed: i128,
    pub tokens_allocated: i128,
    pub tokens_claimed: i128,
    pub star_points_used: i128,
    pub last_claim_time: u64,
}

#[derive(Clone)]
#[contracttype]
pub struct VestingSchedule {
    pub total_amount: i128,
    pub claimed_amount: i128,
    pub start_time: u64,
    pub cliff_duration: u64,
    pub total_duration: u64,
}
