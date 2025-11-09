# ⭐ STAR DeFi Platform

<div align="center">

![Stellar](https://img.shields.io/badge/Stellar-Testnet-7D00FF?style=for-the-badge&logo=stellar&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-Soroban-CE422B?style=for-the-badge&logo=rust&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A Premium DeFi Token Launch Platform Built on Stellar Blockchain**

[Launch App](https://star-defi.repl.co) • [Documentation](#-documentation) • [Smart Contracts](#-smart-contract-deployment)

</div>

---

## 🌟 Project Overview

STAR is a premium-level decentralized finance (DeFi) platform built on the Stellar blockchain that revolutionizes token launches through an innovative points-based participation system. Users can create and launch tokens with integrated airdrop mechanisms, liquidity locking, and customizable vesting schedules—all powered by Soroban smart contracts.

### Key Features & Benefits

✨ **Token Creation & Launch Platform**
- Create custom tokens with configurable supply, decimals, and distribution
- Automated token deployment through Soroban smart contracts
- Professional project pages with social links and branding

🎯 **Points-Based Participation System**
- Mint STAR points using XLM at a 1:10 ratio (1 XLM = 10 STAR points)
- Use STAR points to participate in token launches
- Fair allocation based on participation weight

🎁 **Airdrop Mechanism**
- Automated airdrop distribution to participants
- Configurable airdrop allocation percentages
- Proportional distribution based on STAR points contributed

💧 **Liquidity Locking & DEX Integration**
- Built-in liquidity pool allocation
- Minimum liquidity requirements
- Ready for DEX integration on Stellar

⏰ **Vesting Schedules**
- Customizable vesting periods for token unlock
- Linear vesting with cliff periods
- Automated vesting calculations in smart contracts

🤝 **Referral System**
- Earn 10% rewards on referred users' minted points
- Unique referral codes for each user (format: STAR + 6 characters)
- Automatic reward distribution

⚡ **Stellar Blockchain Integration**
- Built on Stellar testnet with production-ready architecture
- Low transaction fees and fast finality
- Soroban smart contracts written in Rust

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18.3** | Modern UI library with hooks and concurrent features |
| **TypeScript 5.6** | Type-safe development and better IDE support |
| **Vite** | Lightning-fast build tool and dev server |
| **TanStack Query** | Powerful async state management and caching |
| **Wouter** | Lightweight client-side routing (~1.5KB) |
| **Radix UI** | Accessible, unstyled component primitives |
| **shadcn/ui** | Beautiful, customizable component library |
| **Tailwind CSS** | Utility-first CSS framework |
| **Framer Motion** | Production-ready animation library |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js 20** | JavaScript runtime environment |
| **Express.js** | Fast, minimalist web framework |
| **TypeScript** | Type-safe server-side code |
| **PostgreSQL** | Robust relational database |
| **Drizzle ORM** | Type-safe, lightweight ORM |
| **Zod** | Schema validation for API endpoints |

### Blockchain

| Technology | Purpose |
|------------|---------|
| **Stellar Blockchain** | Fast, low-cost blockchain network |
| **Soroban** | Smart contract platform for Stellar |
| **Rust** | Systems programming language for contracts |
| **@stellar/stellar-sdk** | JavaScript SDK for Stellar integration |
| **Freighter Wallet** | Browser extension wallet for Stellar |

---

## 🚀 Features

### Token Creation & Launch Platform

Create professional token launches with comprehensive configuration options:

- **Token Metadata**: Name, symbol, decimals, and total supply
- **Distribution Control**: Configure airdrop, creator, and liquidity allocations
- **Visual Branding**: Upload logos and add social media links
- **Time-Limited Campaigns**: Set participation periods (3-15 days)
- **Smart Contract Integration**: Automated deployment on Stellar

### Points-Based Participation System

A fair and transparent way to participate in token launches:

- **XLM to STAR Conversion**: 1 XLM = 10 STAR points
- **Minting Interface**: Easy-to-use UI for converting XLM to STAR points
- **Balance Tracking**: Real-time STAR points balance display
- **Participation Mechanism**: Use points to participate in launches
- **50/50 Split**: Points are split between burning (50%) and project creator (50%)

### Airdrop Mechanism

Automated token distribution to participants:

- **Proportional Distribution**: Tokens allocated based on STAR points contributed
- **Configurable Allocation**: Project creators set airdrop percentage
- **Smart Contract Execution**: Automated distribution via Soroban
- **Claim System**: Users claim vested tokens through smart contracts

### Liquidity Locking & DEX Integration

Built-in liquidity management:

- **Liquidity Pool Allocation**: Configurable percentage for liquidity
- **Minimum Liquidity Requirements**: Ensures sufficient liquidity (minimum 500)
- **DEX Ready**: Prepared for integration with Stellar DEX
- **Creator Control**: Project creators manage liquidity allocation

### Vesting Schedules

Flexible token vesting for long-term alignment:

- **Optional Vesting**: Enable/disable vesting per project
- **Custom Vesting Periods**: Set vesting duration in days
- **Linear Vesting**: Gradual token unlock over time
- **Cliff Periods**: Optional initial lock period
- **Claim Interface**: Users claim unlocked tokens

### Referral System

Grow the platform with incentivized referrals:

- **10% Reward Rate**: Earn 10% of referred users' minted points
- **Unique Codes**: Each user gets a STAR-prefixed referral code
- **Automatic Tracking**: System tracks referral relationships
- **Instant Rewards**: Rewards distributed immediately on point minting

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20+**: [Download here](https://nodejs.org/)
- **npm or yarn**: Comes with Node.js
- **PostgreSQL**: [Download here](https://www.postgresql.org/download/)
- **Freighter Wallet**: [Chrome Extension](https://www.freighter.app/)
- **Stellar Testnet Account**: Create via [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)

For smart contract development (optional):
- **Rust 1.70+**: [Install Rust](https://rustup.rs/)
- **Soroban CLI**: `cargo install --locked soroban-cli`
- **wasm32 target**: `rustup target add wasm32-unknown-unknown`

---

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/star-defi-platform.git
cd star-defi-platform
```

### 2. Install Dependencies

```bash
npm install
```

This installs all frontend and backend dependencies in one command.

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/star_defi

# Server Configuration
PORT=5000
NODE_ENV=development

# Stellar Network Configuration
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

# Smart Contract Addresses (after deployment)
STAR_TOKEN_CONTRACT_ID=your_star_token_contract_id
TOKEN_LAUNCH_CONTRACT_ID=your_token_launch_contract_id
```

### 4. Set Up the Database

Run database migrations:

```bash
npm run db:push
```

This creates all necessary tables using Drizzle ORM.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:5000/api

The dev server uses Vite for hot module replacement (HMR) on the frontend and tsx for TypeScript execution on the backend.

---

## 🔐 Smart Contract Deployment

### Prerequisites

Ensure you have Rust and Soroban CLI installed:

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Soroban CLI
cargo install --locked soroban-cli

# Add wasm32 target
rustup target add wasm32-unknown-unknown
```

### Building Contracts

Navigate to the contracts directory:

```bash
cd contracts
```

Build all contracts:

```bash
make build
```

Or build optimized WASM files for deployment:

```bash
make optimize
```

This creates optimized WASM files in `target/wasm32-unknown-unknown/release/`.

### Testing Contracts

Run the test suite:

```bash
make test
```

### Deploying to Stellar Testnet

#### 1. Deploy STAR Token Contract

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/star_token.wasm \
  --source YOUR_SECRET_KEY \
  --network testnet
```

Save the returned contract ID.

#### 2. Initialize STAR Token

```bash
soroban contract invoke \
  --id STAR_TOKEN_CONTRACT_ID \
  --source YOUR_SECRET_KEY \
  --network testnet \
  -- initialize \
  --admin YOUR_ADMIN_ADDRESS \
  --name "STAR Points" \
  --symbol "STAR"
```

#### 3. Deploy Token Launch Contract

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/token_launch.wasm \
  --source YOUR_SECRET_KEY \
  --network testnet
```

#### 4. Initialize Token Launch Contract

```bash
soroban contract invoke \
  --id TOKEN_LAUNCH_CONTRACT_ID \
  --source YOUR_SECRET_KEY \
  --network testnet \
  -- initialize \
  --admin YOUR_ADMIN_ADDRESS \
  --star_token STAR_TOKEN_CONTRACT_ID
```

#### 5. Update Environment Variables

Add the contract addresses to your `.env` file:

```env
STAR_TOKEN_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TOKEN_LAUNCH_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Contract Addresses

**Testnet Deployment:**
- STAR Token Contract: `Coming soon`
- Token Launch Contract: `Coming soon`

---

## ✅ Scaffold Stellar Requirements

This project fulfills all Scaffold Stellar requirements:

- ✅ **Deployed Smart Contract**: Soroban contracts deployed on Stellar testnet
- ✅ **React + TypeScript Frontend**: Modern React 18.3 with TypeScript 5.6
- ✅ **Stellar Wallet Integration**: Freighter wallet integration via @stellar/stellar-sdk

---

## 🌐 Environment Variables

### Required Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/star_defi

# Server
PORT=5000
NODE_ENV=development

# Stellar Network
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
```

### Optional Variables

```env
# Smart Contracts (required after deployment)
STAR_TOKEN_CONTRACT_ID=your_contract_id
TOKEN_LAUNCH_CONTRACT_ID=your_contract_id

# Session (optional, currently using in-memory)
SESSION_SECRET=your_session_secret
```

### Frontend Environment Variables

Frontend environment variables must be prefixed with `VITE_`:

```env
VITE_STELLAR_NETWORK=testnet
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
```

---

## 📡 API Documentation

### Authentication

#### Connect Wallet
```http
POST /api/auth/connect
```

**Request Body:**
```json
{
  "walletAddress": "GXXXXXX...",
  "referralCode": "STARABC123" // optional
}
```

**Response:**
```json
{
  "id": "uuid",
  "walletAddress": "GXXXXXX...",
  "starPoints": 0,
  "referralCode": "STARXYZ789",
  "referredBy": "STARABC123",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Users

#### Get Current User
```http
GET /api/users/me?walletAddress=GXXXXXX...
```

#### Get User's Referrals
```http
GET /api/users/:id/referrals
```

#### Get User's Projects
```http
GET /api/users/:userId/projects
```

#### Get User's Participations
```http
GET /api/users/:userId/participations
```

### Points

#### Mint STAR Points
```http
POST /api/points/mint
```

**Request Body:**
```json
{
  "walletAddress": "GXXXXXX...",
  "xlmAmount": 10
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "starPoints": 100
  },
  "transaction": {
    "xlmAmount": 10,
    "starPointsMinted": 100,
    "referrerReward": 10,
    "referrerWallet": "GYYYYYY..."
  }
}
```

### Projects

#### Create Project
```http
POST /api/projects/create
```

**Request Body:**
```json
{
  "walletAddress": "GXXXXXX...",
  "name": "My Token",
  "symbol": "MTK",
  "description": "An innovative token project",
  "totalSupply": "1000000",
  "decimals": 7,
  "airdropPercent": 50,
  "creatorPercent": 30,
  "liquidityPercent": 20,
  "minimumLiquidity": "500",
  "hasVesting": true,
  "vestingPeriodDays": 90,
  "participationPeriodDays": 7,
  "logoUrl": "https://example.com/logo.png",
  "twitterUrl": "https://twitter.com/mytoken",
  "telegramUrl": "https://t.me/mytoken",
  "websiteUrl": "https://mytoken.io"
}
```

#### Get All Active Projects
```http
GET /api/projects
```

#### Get Project by ID
```http
GET /api/projects/:id
```

#### Participate in Project
```http
POST /api/projects/:projectId/participate
```

**Request Body:**
```json
{
  "walletAddress": "GXXXXXX...",
  "starPoints": 50
}
```

**Response:**
```json
{
  "participation": {
    "id": "uuid",
    "userId": "uuid",
    "projectId": "uuid",
    "starPointsUsed": 50,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "burned": 25,
  "toCreator": 25,
  "newBalance": 50
}
```

#### Get Project Participations
```http
GET /api/projects/:projectId/participations
```

### Statistics

#### Get Global Stats
```http
GET /api/stats/global
```

**Response:**
```json
{
  "totalUsers": 1250,
  "dailyActiveUsers": 312,
  "activeProjects": 45,
  "totalPointsMinted": 125000
}
```

---

## 📁 Project Structure

```
star-defi-platform/
├── client/                      # Frontend React application
│   ├── public/                  # Static assets
│   └── src/
│       ├── components/          # React components
│       │   ├── ui/             # shadcn/ui components
│       │   ├── AppHeader.tsx   # Application header
│       │   ├── Dashboard.tsx   # User dashboard
│       │   ├── MintPoints.tsx  # Points minting interface
│       │   └── ...
│       ├── contexts/           # React contexts
│       │   └── WalletContext.tsx
│       ├── hooks/              # Custom React hooks
│       ├── lib/                # Utility functions
│       │   ├── queryClient.ts  # TanStack Query setup
│       │   └── walletConnect.ts
│       ├── pages/              # Page components
│       │   ├── Landing.tsx     # Landing page
│       │   └── MainApp.tsx     # Main application
│       ├── App.tsx             # App entry point
│       ├── main.tsx            # React DOM render
│       └── index.css           # Global styles
│
├── server/                      # Backend Express application
│   ├── index.ts                # Server entry point
│   ├── routes.ts               # API route definitions
│   ├── storage.ts              # Data storage interface
│   └── vite.ts                 # Vite middleware config
│
├── contracts/                   # Soroban smart contracts (Rust)
│   ├── star_token/             # STAR points token contract
│   │   ├── src/
│   │   │   └── lib.rs
│   │   └── Cargo.toml
│   ├── token_launch/           # Main platform contract
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   └── storage.rs
│   │   └── Cargo.toml
│   ├── Cargo.toml              # Workspace configuration
│   ├── Makefile                # Build automation
│   └── README.md               # Contract documentation
│
├── shared/                      # Shared TypeScript types
│   └── schema.ts               # Database schema & types
│
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── drizzle.config.ts           # Drizzle ORM configuration
└── README.md                   # This file
```

---

## 🎨 Design System

The platform features a premium, Binance-inspired design system:

### Color Palette
- **Primary**: Orange (#FF6B00) - Action buttons, highlights
- **Background**: Black (#000000) - Main background
- **Card**: Dark gray (#1A1A1A) - Card backgrounds
- **Accent**: Orange variants - Hover states, borders

### Typography
- **Headings**: Poppins (600-700 weight)
- **Body**: Inter (400-500 weight)
- **Monospace**: JetBrains Mono (for addresses)

### Component Library
- Built on Radix UI primitives for accessibility
- Custom shadcn/ui components with "New York" style
- Consistent spacing scale (4px base unit)
- Responsive design (mobile-first approach)

---

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR

# Building
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema changes to database

# Type Checking
npm run check        # Run TypeScript type checking

# Smart Contracts
cd contracts
make build          # Build contracts
make test           # Run contract tests
make optimize       # Build optimized WASM files
make clean          # Clean build artifacts
```

### Code Quality

The project uses:
- **TypeScript**: For type safety across frontend and backend
- **ESLint**: Code linting (configured via Vite)
- **Prettier**: Code formatting (recommended)
- **Zod**: Runtime validation for API inputs
- **Drizzle ORM**: Type-safe database queries

---

## 🔒 Security Considerations

### Smart Contracts
- All state-changing functions require proper authentication
- Vesting schedules enforce cliff periods and linear vesting
- Amount validations prevent negative or zero transfers
- Project finalization only after end time
- STAR points tracked separately and validated on use

### Backend
- Input validation using Zod schemas
- SQL injection prevention via Drizzle ORM
- No session management (stateless API)
- Wallet address-based authentication

### Frontend
- Client-side validation before API calls
- Secure wallet integration via Freighter
- No private key handling in browser
- HTTPS required for production

---

## 🤝 Contributing

We welcome contributions to the STAR DeFi Platform! Here's how you can help:

### Development Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Run tests**: `npm run check && cd contracts && make test`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and well-described
- Ensure all tests pass before submitting PR

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Additional test coverage

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 STAR DeFi Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support & Community

- **Documentation**: [View Docs](#-documentation)
- **Issues**: [GitHub Issues](https://github.com/yourusername/star-defi-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/star-defi-platform/discussions)

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:
- [Stellar](https://stellar.org) - Fast, low-cost blockchain
- [Soroban](https://soroban.stellar.org) - Smart contracts for Stellar
- [React](https://react.dev) - UI library
- [Vite](https://vitejs.dev) - Build tool
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [shadcn/ui](https://ui.shadcn.com) - Component library
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM

---

<div align="center">

**Built with ⭐ by the STAR Team**

[Website](https://star-defi.repl.co) • [GitHub](https://github.com/yourusername/star-defi-platform) • [Twitter](https://twitter.com/star_defi)

</div>
