# Delphi Homepage Structure Analysis

## Overview
The homepage (src/app/page.tsx) is a client-side component that displays NFT marketplace content. It handles data fetching, state management, and rendering of multiple UI sections.

## Data Flow
- Fetches listings using `getAllListings()` from "@/features/marketplace/services/marketplace-v5"
- Sets both regular and featured listings (first 3 items)
- Calculates market statistics based on the listings data
- Manages carousel state for featured items
- Handles modal states for "Coming Soon" and "Stats" panels

## Page Sections

### 1. Two-Column Hero Section (New) ✅
- **Location**: Top of page when content is loaded
- **Files Involved**: 
  - src/app/page.tsx (main homepage)
  - src/app/features/marketplace/pages/page.tsx (marketplace page)
  - @/features/nft/mintzone/components/HomepageMintCard
- **Description**:
  - Left column (65-70%): Featured Carousel showcasing NFT listings
  - Right column (30-35%): HomepageMintCard component for minting NFTs
  - Cosmic-themed backgrounds and styled headings
  - Responsive layout (stacks vertically on mobile)

### 2. Loading & Error States
- **Location**: Top of main component
- **Files Involved**: 
  - src/app/page.tsx
  - @/components/feedback/LoadingIndicator
- **Description**: Shows loading spinner or error message when necessary

### 3. Featured Carousel Section (Modified to fit in two-column layout)
- **Location**: Left column of hero section
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**: 
  - Carousel of featured NFT listings (up to 3)
  - Auto-advances every 5 seconds
  - Includes navigation controls and indicators
  - Each card has image, title, collection name, price, and buttons

### 4. Mint Card Section (New) ✅
- **Location**: Right column of hero section
- **Files Involved**:
  - @/features/nft/mintzone/components/HomepageMintCard
- **Description**:
  - Interface for minting Delphi Day One NFTs
  - Uses ThirdWeb SDK for blockchain interactions
  - Connected to contract address: "0x8938fc030Df8780A479f393982890980A192c63f"
  - Styled with cosmic theme background
  - Responsive design that works on all screen sizes

### 5. Main Marketplace Listings
- **Location**: After hero section
- **Files Involved**: 
  - @/features/marketplace/components/NFTMarketplaceDashboard
- **Description**:
  - Displays all available listings
  - Imported from external component file
  - Shows "NO PROPHECIES FOUND" if empty

### 6. Hero/Info Section
- **Location**: Middle of page
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**:
  - Title "DELPHI: THE CENTER OF THE WORLD"
  - Paragraph explaining the marketplace
  - Credits section
  - Two buttons: "CREATE LISTING" and "VIEW STATS"
  - Animated background (cosmic-connection)

### 7. New Listings Section
- **Location**: After hero section
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**:
  - Section title and "View All" link
  - Grid layout for new listings
  - **Note**: Implementation appears incomplete (commented grid)

### 8. All Listings Section
- **Location**: After new listings section
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**:
  - Section title
  - Grid layout for all listings
  - "EXPLORE ALL" button
  - **Note**: Implementation appears incomplete (commented grid)

### 9. Coming Soon Modal
- **Location**: Modal (appears when triggered)
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**:
  - Triggered by "CREATE LISTING" button
  - Shows feature name, animated icon
  - "Got it" button to dismiss

### 10. Stats Modal
- **Location**: Modal (appears when triggered)
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**:
  - Triggered by "VIEW STATS" button
  - Shows marketplace statistics
  - Four key metrics: Total Listings, Trading Volume, Total Sales, Avg. Price
  - Placeholder for future analytics chart
  - Close button

## Visual Structure (Top to Bottom)
```
┌─────────────────────────────────────────┐
│ Loading State (conditional)             │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Error State (conditional)               │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Two-Column Hero Section                 │
│ ┌───────────────────┐ ┌───────────────┐ │
│ │ Featured Carousel │ │ HomepageMint  │ │
│ │ (65-70% width)    │ │ Card          │ │
│ │                   │ │ (30-35% width)│ │
│ │ ┌───┐ ┌───┐ ┌───┐ │ │ ┌───────────┐ │ │
│ │ │   │ │   │ │   │ │ │ │           │ │ │
│ │ └───┘ └───┘ └───┘ │ │ │           │ │ │
│ │    Indicators     │ │ │           │ │ │
│ └───────────────────┘ │ └───────────┘ │ │
│                       └───────────────┘ │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ NFTMarketplaceDashboard                 │
│ (All listings - external component)     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Hero/Info Section                       │
│ DELPHI: THE CENTER OF THE WORLD         │
│ Description text...                     │
│                                         │
│ [CREATE LISTING] [VIEW STATS]           │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ New Listings               [View All →] │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐                │
│ │   │ │   │ │   │ │   │                │
│ └───┘ └───┘ └───┘ └───┘                │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ All Listings                            │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐                │
│ │   │ │   │ │   │ │   │                │
│ └───┘ └───┘ └───┘ └───┘                │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐                │
│ │   │ │   │ │   │ │   │                │
│ └───┘ └───┘ └───┘ └───┘                │
│                                         │
│           [EXPLORE ALL]                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Coming Soon Modal (overlay)             │
│ ┌───────────────────────────────────┐   │
│ │ Coming Soon                     X │   │
│ │                                   │   │
│ │ We're working on bringing you     │   │
│ │ amazing [feature] features        │   │
│ │                                   │   │
│ │            [C]                    │   │
│ │                                   │   │
│ │           [Got it]                │   │
│ └───────────────────────────────────┘   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Stats Modal (overlay)                   │
│ ┌───────────────────────────────────┐   │
│ │ Marketplace Stats               X │   │
│ │ ┌────┐ ┌────┐ ┌────┐ ┌────┐      │   │
│ │ │Lis-│ │Vol-│ │Sales│ │Avg.│      │   │
│ │ │tings│ │ume │ │     │ │Price│     │   │
│ │ └────┘ └────┘ └────┘ └────┘      │   │
│ │                                   │   │
│ │ Activity Chart                    │   │
│ │ ┌───────────────────────────┐     │   │
│ │ │                           │     │   │
│ │ │  Advanced analytics       │     │   │
│ │ │  coming soon!             │     │   │
│ │ │                           │     │   │
│ │ └───────────────────────────┘     │   │
│ │                                   │   │
│ │           [Close]                 │   │
│ └───────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## Notes and Observations
1. The New Listings and All Listings sections have grid containers but no actual implementation (commented out).
2. The NFTMarketplaceDashboard is an external component that handles the main marketplace display.
3. "Coming Soon" modal is triggered by events dispatched through the window.
4. The page uses a "Cosmic Overload" theme with space-themed classes and animations.
5. Some hardcoded stats data exists (total volume, total sales).
6. The page follows a vertical layout with sections stacked one after another.
7. Featured listings are a subset of all listings (first 3 items).
8. The HomepageMintCard uses a ThirdWeb SDK to interact with the blockchain.
9. Both main homepage and marketplace page have the same structure with the two-column hero section.

## Recent Updates
1. Added two-column hero section with the HomepageMintCard component
2. Fixed contract address from "0x656b65339B2CCd5908B51b993D38d46e3283dB7c" to "0x8938fc030Df8780A479f393982890980A192c63f"
3. Ensured proper functioning of the mint feature on both pages

## Future Plans
1. Create a centralized contract helper file to manage all NFT contract addresses:
   ```typescript
   // Planned: src/app/features/nft/contracts/index.ts
   
   export const NFT_CONTRACTS = {
     DELPHI_DAY_ONE: "0x8938fc030Df8780A479f393982890980A192c63f",
     // Add other contracts as needed
   };
   ```
2. Refactor both homepage and marketplace page to use this central contract registry
3. Add environment-specific contract configurations for different networks (testnet vs mainnet) 