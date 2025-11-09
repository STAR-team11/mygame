# STAR DeFi Platform - Design Guidelines

## Design Approach
**Reference-Based**: Binance-level premium DeFi platform quality with professional crypto trading aesthetics. Draw inspiration from Binance, Uniswap, and top-tier DeFi platforms for interaction patterns and visual hierarchy.

## Core Design Principles

### Color System
- **Primary**: Orange (#FF6B00, #FF8533, #FFA366 for gradients)
- **Base**: Pure Black (#000000) for backgrounds
- **Accents**: Dark gray (#1A1A1A, #2A2A2A) for cards and containers
- **Text**: White (#FFFFFF) for primary text, rgba(255,255,255,0.7) for secondary
- **Borders**: rgba(255,107,0,0.2) for subtle separation

### Typography
- **Font Family**: 'Inter' or 'Poppins' from Google Fonts for modern, clean appearance
- **Hierarchy**: 
  - Hero/Display: 56-72px, font-weight: 700
  - H1: 40-48px, font-weight: 600
  - H2: 32-36px, font-weight: 600
  - H3: 24-28px, font-weight: 500
  - Body: 16px, font-weight: 400
  - Small/Caption: 14px, font-weight: 400

### Layout System
**Spacing Scale**: Use 4, 8, 16, 24, 32, 48, 64, 96px (Tailwind: p-1, p-2, p-4, p-6, p-8, p-12, p-16, p-24)
- Consistent grid system: max-w-7xl container with px-6 on mobile, px-8 on desktop
- Card padding: p-6 to p-8
- Section spacing: py-16 to py-24

## Page-Specific Designs

### Landing Page
- **Hero Section**: Full viewport (min-h-screen) with gradient overlay on black background
- Orange gradient animation effect (subtle pulse/glow)
- Center-aligned content with large heading, tagline, single "Launch App" button
- Button: Large (px-12 py-4), orange background with glow effect, white text, no arrow
- Background: Animated SVG grid pattern or particle effects

### Main App Page

**Header**: 
- Fixed top navigation, h-20, backdrop-blur with semi-transparent black
- Left: STAR logo with orange accent
- Right: "Connect Wallet" button (orange outline, hover fill)
- Hamburger menu icon (top-right, opens overlay)

**Projects Grid**:
- 3-column grid on desktop (lg:grid-cols-3), 2 on tablet (md:grid-cols-2), 1 on mobile
- Each card: dark background (#1A1A1A), orange border on hover, rounded-2xl
- Card content: Project logo (top), name, description, supply stats, liquidity amount, participation countdown
- Grid gap: gap-6

**Bottom Navigation**:
- Fixed bottom bar on mobile, sidebar on desktop
- Icons with labels: Launch, Mint Points, Global, Dashboard, Documentation, Join Us
- Social icons: Twitter, Telegram, Discord (orange on hover)

### Create Project Flow (3-Step Wizard)

**Layout**: Centered card (max-w-3xl), step indicator at top with orange active state
- **Step 1**: Form fields for Name, Symbol, Supply, Decimals, Description, Social links (2-column grid)
- **Step 2**: Percentage sliders/inputs with visual pie chart showing distribution (Airdrop, Creator, Liquidity)
- **Step 3**: Liquidity requirement input (XLM), vesting toggle with date picker, participation period slider (3-15 days)
- Progress bar showing completion percentage
- Navigation: "Back" and "Next/Create" buttons at bottom

### STAR Points System

**3D Visual Design**:
- Large 3D star icon rendered as SVG with gradient fill (orange to lighter orange)
- Drop shadow and subtle rotation animation
- Minting interface: Input field for XLM amount, auto-calculates STAR points (×10 multiplier)
- Display: "1 XLM = 10 STAR" prominently
- Distribution breakdown shown below: "50% Burned | 50% to Creator"

### Global Stats Page
- Large metric cards in grid (grid-cols-1 md:grid-cols-3)
- Each card: number (72px, orange), label below
- Animated counter effect on load
- Stats: Total Users, Daily Active Users, Active Projects, Total Points Minted

### Dashboard
- Left sidebar: User avatar, point balance (large, orange), referral code
- Main area: Tabs for "My Projects", "Participation History", "Referrals"
- Referral section: Copy link button, share buttons, referral tree visualization
- Point balance shown with 3D STAR icon

### Documentation Page
- Single-column layout (max-w-4xl)
- Sections: Platform Overview, Tokenomics, STAR Points, Project Creation, Vesting
- **STR Tokenomics**: Pie chart showing 80% (point holders) vs 20% (team/listing)
- Table format for detailed breakdowns
- Code snippets in dark containers with syntax highlighting

## Component Library

### Buttons
- **Primary**: Orange background, white text, rounded-lg, px-6 py-3, hover glow
- **Secondary**: Orange border, orange text, transparent bg, hover fill
- **Wallet Connect**: Special styling with wallet icon, larger size

### Cards
- Background: #1A1A1A
- Border: 1px solid rgba(255,107,0,0.2)
- Hover: border-color rgba(255,107,0,0.6), slight scale (1.02)
- Padding: p-6
- Border radius: rounded-2xl

### Form Inputs
- Dark background (#2A2A2A)
- Orange focus ring
- White text, placeholder rgba(255,255,255,0.5)
- Border: 1px solid rgba(255,255,255,0.1)

### Modals/Overlays
- Backdrop: rgba(0,0,0,0.8) with backdrop-blur
- Content: centered card, max-w-2xl
- Close button: top-right, orange hover

## Animations & Effects
- **Minimal & Professional**: No excessive animations
- Button hover: Subtle glow effect with box-shadow
- Card hover: Scale 1.02, border color intensify
- Page transitions: Fade (300ms)
- Loading states: Orange spinner/pulse
- STAR points: Gentle floating/rotation animation

## Images & Graphics
- **SVG Icons**: Use Heroicons for UI elements
- **3D Visuals**: CSS-based 3D star icons with gradients and shadows
- **Grid Patterns**: Animated SVG grid in hero background
- **Charts**: Use Chart.js with orange color scheme for data visualization
- No stock photos; focus on SVG graphics and data visualizations

## Accessibility
- High contrast maintained (white on black, orange accents)
- Focus states: 2px orange outline
- All interactive elements min 44px touch target
- ARIA labels for icons and wallet buttons