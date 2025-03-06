# Delphi NFT Marketplace

A modern, user-friendly NFT marketplace built on the Metis blockchain.

## Overview

Delphi is a decentralized NFT marketplace that allows users to buy, sell, and discover unique digital assets. Built with Next.js and integrated with the Metis blockchain, Delphi provides a seamless experience for NFT enthusiasts and creators.

## Features

- **Browse NFTs**: Discover NFTs from various collections
- **Buy NFTs**: Purchase NFTs using METIS or WMETIS tokens
- **List NFTs**: Create listings for your NFTs
- **User Profiles**: View owned and created NFTs
- **Collections**: Browse NFTs by collections
- **Search & Filter**: Find NFTs by name, collection, or attributes
- **Wallet Integration**: Connect/disconnect various wallet types including MetaMask, Trust Wallet, and in-app wallets
- **Transaction Notifications**: Real-time updates on blockchain transactions

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Blockchain Integration**: Thirdweb SDK (v5), Metis Blockchain
- **Styling**: TailwindCSS, CSS Modules
- **State Management**: React Context API
- **Testing**: Jest, React Testing Library

## MVP Roadmap

### Phase 1: Core Functionality Completion (2-3 weeks)

1. **Wallet Connection & Authentication**
   - [x] Basic wallet connection
   - [x] Improve wallet connection flow with better UI
   - [x] Add wallet connection status indicators
   - [x] Implement wallet disconnect functionality
   - [ ] Create user profile page linked to wallet address
   - [ ] Implement session persistence

2. **NFT Listing Enhancement**
   - [x] Basic NFT card display
   - [x] Complete NFT detail page with full metadata
   - [x] Add NFT purchase functionality (METIS/WMETIS)
   - [ ] Add related NFTs section on detail page
   - [ ] Implement "Create Listing" UI for users to list their NFTs
   - [ ] Add support for NFT image/metadata upload

3. **Transaction Management**
   - [x] Basic buy functionality
   - [x] Implement loading states for transactions
   - [x] Create notification system for transaction updates
   - [ ] Add transaction history for users
   - [ ] Add transaction confirmation modals

### Phase 2: User Experience Improvements (2-3 weeks)

1. **Search & Filter Functionality**
   - [ ] Implement search by NFT name, collection, or creator
   - [ ] Add filtering options (price range, recently listed, etc.)
   - [ ] Create category navigation
   - [ ] Add sorting options for search results

2. **UI/UX Enhancement**
   - [x] Basic responsive design
   - [ ] Improve overall design with more engaging visuals
   - [ ] Add animations and transitions for smoother experience
   - [ ] Ensure mobile responsiveness across all pages
   - [ ] Implement dark/light mode toggle

3. **Collections & Categories**
   - [ ] Create collection pages to group related NFTs
   - [ ] Implement featured collections on homepage
   - [ ] Add trending collections section
   - [ ] Create collection management for creators

### Phase 3: Advanced Features & Optimization (2-3 weeks)

1. **User Profiles & Social Features**
   - [ ] Enhanced user profiles with owned and created NFTs
   - [ ] Add following/follower functionality
   - [ ] Implement activity feed for users
   - [ ] Add profile customization options

2. **Bidding & Auctions**
   - [ ] Add support for auction-style listings
   - [ ] Implement bidding functionality
   - [ ] Create time-based auction endings
   - [ ] Add notifications for outbid events

3. **Performance Optimization**
   - [ ] Implement caching strategies for NFT metadata
   - [ ] Optimize image loading and rendering
   - [ ] Add pagination for large collections
   - [ ] Implement infinite scroll for better UX

### Phase 4: Testing & Deployment (1-2 weeks)

1. **Testing**
   - [ ] Implement unit tests for core functionality
   - [ ] Add integration tests for blockchain interactions
   - [ ] Perform UI/UX testing across devices
   - [ ] Conduct user testing sessions

2. **Security Audit**
   - [ ] Review smart contract interactions
   - [ ] Ensure proper error handling
   - [ ] Validate input sanitization
   - [ ] Implement rate limiting for API calls

3. **Deployment**
   - [ ] Deploy to production environment
   - [ ] Set up monitoring and analytics
   - [ ] Create documentation for users
   - [ ] Implement CI/CD pipeline

## Recently Completed Features

### Wallet Connection Improvements
- Added proper wallet disconnect functionality
- Implemented wallet connection status indicators
- Added support for multiple wallet types (MetaMask, Trust Wallet, In-app wallets)

### NFT Purchase Implementation
- Added support for buying NFTs with METIS (native token)
- Added support for buying NFTs with WMETIS (wrapped METIS)
- Implemented automatic token wrapping for compatible listings
- Added transaction notifications and status updates
- Improved error handling for transaction failures

### Transaction Management
- Created transaction notification system
- Implemented real-time transaction status updates
- Added better error messaging for failed transactions

## Immediate Next Steps

1. Add NFT listing creation functionality
2. Enhance user profiles
3. Implement search and filter functionality
4. Add transaction history

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask wallet or other Web3 wallet

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/delphi.git
   cd delphi
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
   MARKETPLACE_ADDRESS=your_marketplace_contract_address
   WMETIS_CONTRACT_ADDRESS=your_wmetis_contract_address
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
