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

### 1. Loading & Error States
- **Location**: Top of main component
- **Files Involved**: 
  - src/app/page.tsx
  - @/components/feedback/LoadingIndicator
- **Description**: Shows loading spinner or error message when necessary

### 2. Featured Carousel Section
- **Location**: First section when content is loaded
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**: 
  - Carousel of featured NFT listings (up to 3)
  - Auto-advances every 5 seconds
  - Includes navigation controls and indicators
  - Each card has image, title, collection name, price, and buttons

### 3. Main Marketplace Listings
- **Location**: After featured carousel
- **Files Involved**: 
  - @/features/marketplace/components/NFTMarketplaceDashboard
- **Description**:
  - Displays all available listings
  - Imported from external component file
  - Shows "NO PROPHECIES FOUND" if empty

### 4. Hero/Info Section
- **Location**: Middle of page
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**:
  - Title "DELPHI: THE CENTER OF THE WORLD"
  - Paragraph explaining the marketplace
  - Credits section
  - Two buttons: "CREATE LISTING" and "VIEW STATS"
  - Animated background (cosmic-connection)

### 5. New Listings Section
- **Location**: After hero section
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**:
  - Section title and "View All" link
  - Grid layout for new listings
  - **Note**: Implementation appears incomplete (commented grid)

### 6. All Listings Section
- **Location**: After new listings section
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**:
  - Section title
  - Grid layout for all listings
  - "EXPLORE ALL" button
  - **Note**: Implementation appears incomplete (commented grid)

### 7. Coming Soon Modal
- **Location**: Modal (appears when triggered)
- **Files Involved**:
  - src/app/page.tsx (inline implementation)
- **Description**:
  - Triggered by "CREATE LISTING" button
  - Shows feature name, animated icon
  - "Got it" button to dismiss

### 8. Stats Modal
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
│ Featured Carousel                       │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ Featured│  │ Featured│  │ Featured│  │
│  │  Card 1 │  │  Card 2 │  │  Card 3 │  │
│  └─────────┘  └─────────┘  └─────────┘  │
│       ○ ● ○ (carousel indicators)       │
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