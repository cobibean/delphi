# Delphi NFT Marketplace

Welcome to Delphi - "The Center of the World" for NFT trading on Metis and beyond. This decentralized marketplace connects artists, collectors, and enthusiasts in a visually stunning and interactive platform.

## 🚀 Latest Updates (March 2025)

- **ThirdWeb v5 SDK Migration**: Upgraded from v4 to v5 for improved performance and features
- **Streamlined NFT Buying**: Simplified purchasing with native METIS for better UX and security
- **Real Marketplace Integration**: Connected to real Metis blockchain marketplace contract
- **Enhanced Error System**: Comprehensive error handling with recovery actions and notifications
- **Metis Explorer Integration**: Links to view contracts, tokens, and transactions directly
- **Cosmic Design System**: Unique interdimensional visual style throughout the application

## 🔮 Tech Stack Overview

Delphi is built using a modern tech stack with carefully selected technologies to ensure performance, security, and an exceptional user experience:

### Frontend Framework
- **Next.js 14.1.0**: Server-side rendering and optimized React framework
- **React 18.3+**: Component-based UI development
- **TypeScript**: Type-safe code with improved developer experience

### Styling and UI
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **Framer Motion**: Advanced animations and interactive elements
- **Custom Design System**: Unique "Cosmic Overload" aesthetic with interdimensional effects

### Web3 Integration
- **ThirdWeb SDK (v5)**: SDK for seamless Web3 integration
  - `thirdweb/react`: React components and hooks for Web3 functionality
  - `thirdweb`: Core SDK for blockchain interactions
- **Viem**: Modern Ethereum library for blockchain interaction
- **Metis Blockchain**: Layer 2 scaling solution for Ethereum with lower fees and faster transactions
- **Smart Contract ABIs**: Direct interaction with marketplace contracts using their ABIs

### Transaction Management
- **Custom Transaction System**: Real-time transaction notifications and error handling
- **Wallet Integration**: Secure connection to MetaMask and other Web3 wallets
- **Native METIS Payments**: Streamlined purchasing with native METIS for better UX and security
- **Fee Distribution System**: 100% of marketplace fees distributed to community staking pools

### Package Management
- **npm**: Node package manager for dependency management

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher
- MetaMask or another Web3 wallet with Metis network configured

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/delphi.git
cd delphi
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and add your ThirdWeb Client ID:
```
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_RPC_URL=https://andromeda.metis.io/?owner=1088
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 📁 Project Structure

```
delphi/
├── public/                  # Static files (images, etc.)
├── src/                     # Source code
│   ├── app/                 # Next.js app directory
│   │   ├── components/      # React components
│   │   │   ├── NFTCard/     # NFT card components
│   │   │   └── SharedComponents/ # Header, Footer, etc.
│   │   ├── constants/       # Constants and ABIs
│   │   │   ├── MarketplaceABI.ts  # Marketplace contract ABI
│   │   │   ├── ERC721ABI.ts       # ERC721 NFT standard ABI
│   │   │   ├── ERC1155ABI.ts      # ERC1155 NFT standard ABI
│   │   │   └── contracts.ts       # Contract addresses
│   │   ├── interfaces/      # TypeScript interfaces
│   │   ├── providers/       # Context providers
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── ui/              # UI components
│   │   ├── globals.css      # Global styles
│   │   └── layout.tsx       # Root layout
│   └── ...
├── DELPHI_DESIGN_SYSTEM.md  # Design system documentation
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## 🎨 Design System 

Delphi features a unique "Cosmic Overload" design system that combines:

- **Dimensional Color System**: Dynamic colors with quantum variations
- **Reality-Bending Typography**: Text with distortion and glitch effects
- **Non-Euclidean Grid System**: Fluid and adaptive layouts
- **Interactive Elements**: Quantum-state systems and reality distortion effects

For a detailed overview of the design system, refer to the [DELPHI_DESIGN_SYSTEM.md](./DELPHI_DESIGN_SYSTEM.md) file.

## 🔗 Web3 Integration

### Metis Blockchain

Delphi is built on the Metis Andromeda network (chain ID 1088), Ethereum Layer 2.

### Smart Contract Integration

The marketplace directly integrates with the following contracts:

- **Marketplace Contract**: `0x7e9EE861e3721F9F3664C18A539e63aCb784a208`
- **WMETIS Contract**: `0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481`
- **NFT Contracts**: Various ERC721 and ERC1155 contracts

These contracts are accessed using their ABIs stored in the `src/app/constants/` directory.

### ThirdWeb SDK

The project uses ThirdWeb SDK v5 for wallet connectivity:

```typescript
// Example wallet connection
import { useActiveAccount, useConnect, createWallet } from "thirdweb/react";

const WalletButton = () => {
  const account = useActiveAccount();
  const { connect } = useConnect();
  
  if (!account) {
    return <button onClick={() => connect(createWallet("io.metamask"))}>Sign In</button>;
  }
  
  return <div>Connected: {account.address}</div>;
};
```

### Direct Contract Interaction

For marketplace interactions, we use thirdweb v5 contract functions:

```typescript
// Example: Buy an NFT with METIS
const buyWithMetis = async (listingId, wallet) => {
  // Get the marketplace contract
  const marketplaceContract = getContract({
    client,
    chain: metisChain,
    address: CONTRACT_ADDRESS,
  });
  
  // Get account from wallet
  const account = useActiveAccount();
  
  // Create the buy transaction
  const transaction = buyFromListing({
    contract: marketplaceContract,
    listingId: listingId,
    quantity: 1,
    recipient: account.address,
  });
  
  // Execute the purchase transaction
  const receipt = await sendTransaction({
    transaction,
    account,
  });
  
  // Wait for transaction confirmation
  const confirmedReceipt = await waitForReceipt({
    client,
    chain: metisChain,
    transactionHash: receipt.transactionHash,
  });
  
  return confirmedReceipt;
};
```

### Fee Distribution Model

Delphi features a unique economic model that benefits the entire Metis ecosystem:

- **Community-First Approach**: 100% of marketplace fees are distributed to community staking pools
- **50/50 Split**: Equal distribution between Vesta (VESTA) and Yeti-Apes (YAPES) token staking pools
- **Rewards for Stakers**: Token holders who stake their tokens receive a portion of marketplace fees
- **Sustainable Economics**: This model creates long-term value for the entire ecosystem without extracting value

## 🧠 Development Guidelines

1. **Component Structure**: Follow atomic design principles
2. **TypeScript**: Use proper typing for all components and functions
3. **Styling**: Use Tailwind classes and follow design system
4. **Web3**: Use ThirdWeb v5 hooks for wallet connection, contract functions for transactions
5. **Testing**: Write tests for critical components and functions
6. **Animation**: Use Framer Motion for complex animations

## 🔧 Key Dependencies

- `next`: 14.1.0
- `react`: 18.3+
- `thirdweb`: 5.91.0
- `viem`: 1.20.1
- `@tanstack/react-query`: 5.67.2
- `framer-motion`: 12.4.10
- `tailwindcss`: 3.3.0

## 📅 Development Roadmap

Delphi is currently in active development with a 5-week launch plan. Here are the key upcoming features:

### Current Focus (Week 1)
- **Error System Enhancement**: Improved error tracking, retry mechanisms, and network monitoring
- **Listing Creation**: Implementing direct listing and auction creation flows
- **User Profile**: Adding owned NFTs display and transaction history
- **Staking Page**: Information on fee distribution and staking opportunities

### Coming Soon
- **Search and Filters**: Advanced search functionality and filtering options
- **Enhanced NFT Detail View**: Transaction history, better metadata display, and price tracking
- **Mobile Optimization**: Responsive design improvements for mobile users
- **Enhanced Wallet Features**: Gas sponsorship and in-app wallet capabilities

For the full roadmap, please see [ROADMAP.md](./docs/ROADMAP.md).

## 🔍 Troubleshooting

### Common Issues

1. **Transaction Failures**
   - Ensure your wallet has sufficient METIS for the purchase and gas fees
   - Verify the Metis network is correctly configured in your wallet
   - Check console logs for detailed error messages

2. **NFT Display Issues**
   - If NFT images aren't loading, the NFT's metadata might use unsupported IPFS gateways
   - Check the `/debug` route for detailed information about marketplace listings

3. **Wallet Connection Problems**
   - Make sure your wallet is configured for Metis Andromeda (Chain ID: 1088)
   - RPC URL: https://andromeda.metis.io/?owner=1088
   - Currency Symbol: METIS

## 📞 Contact

For questions or support, please reach out to the development team at [team@delphimarketplace.io](mailto:team@delphimarketplace.io).

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
