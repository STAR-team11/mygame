# STAR Token Platform - Soroban Smart Contracts

Production-ready Rust smart contracts for the STAR token platform on Stellar's Soroban network.

## Overview

This repository contains two main smart contracts:

1. **star_token** - STAR points token contract for rewarding users
2. **token_launch** - Main platform contract for creating and managing token launches

## Prerequisites

- Rust 1.70 or later
- Soroban CLI (install via `cargo install --locked soroban-cli`)
- wasm32-unknown-unknown target: `rustup target add wasm32-unknown-unknown`

## Building Contracts

### Build all contracts

```bash
make build
```

This compiles both contracts to WebAssembly.

### Run tests

```bash
make test
```

### Optimize WASM files

```bash
make optimize
```

This produces optimized WASM files suitable for deployment.

### Clean build artifacts

```bash
make clean
```

## Contract Structure

### STAR Token Contract (`star_token`)

A standard token contract implementing:

- **initialize** - Initialize the token with name, symbol, and admin
- **mint** - Mint new STAR points (admin only)
- **transfer** - Transfer tokens between addresses
- **balance_of** - Query token balance
- **total_supply** - Get total token supply
- **name, symbol, decimals** - Token metadata

### Token Launch Contract (`token_launch`)

The main platform contract implementing:

#### Core Functions

- **initialize(admin, star_token)** - Initialize the contract with admin and STAR token address

- **create_project(...)** - Create a new token launch project
  - Parameters: creator, name, symbol, token_address, allocations, pricing, timing, vesting
  - Returns: project_id

- **participate_in_project(project_id, participant, amount, star_points_to_use)** - Participate in a token launch
  - Users can use STAR points for bonus allocation
  - Calculates token allocation based on contribution and price

- **claim_tokens(project_id, participant)** - Claim vested tokens
  - Implements linear vesting with cliff period
  - Returns: amount of tokens claimed

- **finalize_project(project_id)** - Finalize a project after it ends (creator only)

- **mint_star_points(to, amount)** - Mint STAR points to users (admin only)

- **distribute_airdrop(project_id, recipients, amounts)** - Distribute airdrop tokens

#### Query Functions

- **get_project(project_id)** - Get project details
- **get_participation(project_id, participant)** - Get participation details
- **get_star_points(user)** - Get user's STAR points balance
- **get_project_count()** - Get total number of projects

## Deployment

### Deploy to Testnet

1. Build optimized contracts:
```bash
make optimize
```

2. Deploy STAR token:
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/star_token.wasm \
  --source <YOUR_SECRET_KEY> \
  --network testnet
```

Save the returned contract ID.

3. Initialize STAR token:
```bash
soroban contract invoke \
  --id <STAR_TOKEN_CONTRACT_ID> \
  --source <YOUR_SECRET_KEY> \
  --network testnet \
  -- initialize \
  --admin <ADMIN_ADDRESS> \
  --name "STAR Points" \
  --symbol "STAR"
```

4. Deploy Token Launch contract:
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/token_launch.wasm \
  --source <YOUR_SECRET_KEY> \
  --network testnet
```

5. Initialize Token Launch contract:
```bash
soroban contract invoke \
  --id <TOKEN_LAUNCH_CONTRACT_ID> \
  --source <YOUR_SECRET_KEY> \
  --network testnet \
  -- initialize \
  --admin <ADMIN_ADDRESS> \
  --star_token <STAR_TOKEN_CONTRACT_ID>
```

### Deploy to Mainnet

Follow the same steps as testnet but use `--network mainnet` instead.

## Data Structures

### Project
```rust
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
```

### Participation
```rust
pub struct Participation {
    pub participant: Address,
    pub amount_contributed: i128,
    pub tokens_allocated: i128,
    pub tokens_claimed: i128,
    pub star_points_used: i128,
    pub last_claim_time: u64,
}
```

## Development

### Check code
```bash
make check
```

### Format code
```bash
make fmt
```

### Run linter
```bash
make clippy
```

## Security Considerations

1. All state-changing functions require proper authentication
2. Vesting schedules enforce cliff periods and linear vesting
3. Amount validations prevent negative or zero transfers
4. Project finalization can only happen after end time
5. STAR points are tracked separately and validated on use

## Testing

The contracts include comprehensive unit tests. Run them with:

```bash
cargo test
```

Tests cover:
- Contract initialization
- Token minting and transfers
- Project creation
- Participation tracking
- Vesting calculations
- STAR points management

## License

MIT
