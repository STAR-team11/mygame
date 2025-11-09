.PHONY: build test clean optimize deploy-testnet help

help:
	@echo "Soroban Smart Contract Build System"
	@echo ""
	@echo "Available commands:"
	@echo "  make build           - Build all contracts"
	@echo "  make test            - Run all tests"
	@echo "  make optimize        - Build optimized WASM files"
	@echo "  make clean           - Clean build artifacts"
	@echo "  make deploy-testnet  - Deploy contracts to testnet"
	@echo ""

build:
	@echo "Building contracts..."
	cargo build --target wasm32-unknown-unknown --release
	@echo "Build complete!"

test:
	@echo "Running tests..."
	cargo test
	@echo "Tests complete!"

clean:
	@echo "Cleaning build artifacts..."
	cargo clean
	@echo "Clean complete!"

optimize:
	@echo "Building optimized WASM files..."
	cargo build --target wasm32-unknown-unknown --release
	@echo ""
	@echo "Optimizing token_launch contract..."
	soroban contract optimize \
		--wasm target/wasm32-unknown-unknown/release/token_launch.wasm
	@echo ""
	@echo "Optimizing star_token contract..."
	soroban contract optimize \
		--wasm target/wasm32-unknown-unknown/release/star_token.wasm
	@echo ""
	@echo "Optimization complete!"
	@echo "Optimized files:"
	@ls -lh target/wasm32-unknown-unknown/release/*.wasm

deploy-testnet:
	@echo "Deploying to Stellar testnet..."
	@echo ""
	@echo "Deploying STAR token contract..."
	soroban contract deploy \
		--wasm target/wasm32-unknown-unknown/release/star_token.wasm \
		--source <YOUR_SECRET_KEY> \
		--network testnet
	@echo ""
	@echo "Deploying Token Launch contract..."
	soroban contract deploy \
		--wasm target/wasm32-unknown-unknown/release/token_launch.wasm \
		--source <YOUR_SECRET_KEY> \
		--network testnet
	@echo ""
	@echo "Deployment complete!"
	@echo "Make sure to save the contract IDs for initialization"

install-target:
	@echo "Installing wasm32 target..."
	rustup target add wasm32-unknown-unknown

check:
	@echo "Checking contracts..."
	cargo check --target wasm32-unknown-unknown
	@echo "Check complete!"

fmt:
	@echo "Formatting code..."
	cargo fmt
	@echo "Format complete!"

clippy:
	@echo "Running clippy..."
	cargo clippy --target wasm32-unknown-unknown
	@echo "Clippy complete!"
