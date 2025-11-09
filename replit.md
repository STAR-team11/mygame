# STAR DeFi Platform

## Overview

STAR is a premium-level DeFi platform built on the Stellar blockchain that enables users to create and launch tokens with integrated airdrop, liquidity, and vesting mechanisms. The platform features a points-based participation system where users mint STAR points using XLM, then use those points to participate in token launches. The platform includes a referral system that rewards users with 10% of their referrals' minted points.

## Recent Changes (November 9, 2025)

**UI/UX Improvements:**
- Removed "Premium" branding from landing page, updated to "DeFi Platform on Stellar"
- Removed rocket icons from Launch button and Core Features section
- Removed carousel navigation arrows (manual slide via dots retained)
- Upgraded navigation menu icons to professional Lucide icons (Boxes, Coins, Globe, LayoutDashboard, FileText, UsersRound)

**Wallet Integration:**
- Installed @stellar/freighter-api for Stellar wallet connectivity
- Created WalletSelectionModal component with multi-wallet support (Freighter, Albedo, xBull, LOBSTR, Rabet, Hana)
- Integrated wallet connection button in main app header
- Currently only Freighter wallet is functional, others show "Not available" status

**Token Creation Form Redesign:**
- Removed all SVG animations for cleaner, more professional look
- Replaced distribution sliders with percentage input fields for precise control
- Changed validation to non-blocking (users see warnings but can proceed)
- Improved mobile responsiveness across all form sections
- Maintained transaction flow and functionality

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: No emojis allowed - use Lucide React icons or branded SVG assets only.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom design system based on orange/black premium theme

**Design System:**
- Color palette centered around orange (#FF6B00) primary color with black backgrounds
- Typography using Inter and Poppins font families
- Component library follows "New York" style variant from shadcn/ui
- Premium, Binance-inspired aesthetic with professional crypto trading interface patterns

**Key Pages:**
- Landing page: Single-page hero design with "Launch App" CTA
- Main app: Tabbed interface with sidebar navigation (desktop) and bottom nav (mobile)
- Six main sections: Launch (projects grid), Mint Points, Global Stats, Dashboard, Documentation, Join Us

**Architecture Decisions:**
- Single-page application with client-side routing to provide smooth transitions
- Responsive design with mobile-first approach (bottom nav on mobile, sidebar on desktop)
- Component-based architecture with reusable UI primitives
- No backend authentication - wallet address serves as user identifier

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **ORM**: Drizzle ORM for type-safe database queries
- **Database**: PostgreSQL (configured for Neon serverless)
- **Build Tool**: esbuild for production builds

**API Structure:**
- RESTful API endpoints under `/api` prefix
- Session-less architecture - all operations require wallet address
- Routes organized by resource type (auth, points, projects, users, stats)

**Core Endpoints:**
- `POST /api/auth/connect` - Connect wallet and create/retrieve user
- `POST /api/points/mint` - Mint STAR points by spending XLM
- `POST /api/projects` - Create new token project
- `POST /api/projects/:id/participate` - Participate in project with STAR points
- `GET /api/projects` - List all active projects
- `GET /api/users/me` - Get current user data
- `GET /api/stats/global` - Get platform-wide statistics

**Architecture Decisions:**
- In-memory storage implementation (MemStorage) for development, designed to swap with database implementation
- No session management - stateless API relying on wallet addresses
- Separate server and client build processes
- Development server uses Vite middleware for HMR

### Data Storage

**Database Schema:**

**Users Table:**
- Stores wallet addresses, STAR points balance, referral codes, and referral relationships
- Each user gets a unique referral code on signup (format: STAR + 6 random chars)
- Tracks who referred each user for reward distribution

**Projects Table:**
- Token project configurations including supply, distribution percentages, and vesting
- Three distribution categories: airdrop (to participants), creator allocation, liquidity pool
- Time-limited participation periods with configurable duration
- Optional vesting periods for token unlock schedules
- Social links (Twitter, Telegram, website) and logo URLs

**Participations Table:**
- Junction table tracking user participation in projects
- Records STAR points spent per participation
- Used to calculate token allocation proportional to points contributed

**Design Decisions:**
- PostgreSQL chosen for relational data and ACID compliance
- UUID primary keys for scalability
- Timestamp tracking for all entities
- Real/float types for points to handle fractional values
- Text fields for large numbers (token supplies) to avoid precision issues

### External Dependencies

**Blockchain Integration:**
- **@stellar/stellar-sdk**: Stellar blockchain SDK for smart contract interactions and wallet operations
- **@stellar/freighter-api**: Freighter wallet browser extension integration for wallet connectivity
- Smart contract handles actual token creation, airdrops, liquidity provision, and vesting logic
- WalletSelectionModal supports multiple Stellar wallets (Freighter currently active, others planned)

**Database & ORM:**
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **drizzle-kit**: Schema migrations and database push tooling
- **connect-pg-simple**: PostgreSQL session store (included but not actively used)

**UI Component Libraries:**
- **@radix-ui/***: 20+ headless UI primitives for accessible components
- **class-variance-authority**: Type-safe component variant management
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for UI elements
- **react-icons**: Additional icons (social media)

**Development Tools:**
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundler for server code

**Form & Data Management:**
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation integration
- **zod**: Schema validation for API inputs and forms
- **@tanstack/react-query**: Async state management and caching

**Utility Libraries:**
- **bignumber.js**: Precise decimal arithmetic for token amounts
- **date-fns**: Date manipulation utilities
- **clsx** & **tailwind-merge**: Conditional className utilities
- **nanoid**: Unique ID generation

**Design Rationale:**
- Stellar SDK chosen as the platform is specifically built for Stellar blockchain
- Drizzle ORM selected for excellent TypeScript support and lightweight nature
- Radix UI provides accessible, unstyled primitives allowing custom theming
- React Query eliminates need for Redux/Zustand by managing server state
- Form validation with Zod provides type safety across client and server