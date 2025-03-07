# Delphi NFT Marketplace

Welcome to Delphi - "The Center of the World" for NFT trading on Metis and beyond. This decentralized marketplace connects artists, collectors, and enthusiasts in a visually stunning and interactive platform.

## 🚀 Latest Updates

- **Real Marketplace Integration**: Connected to real Metis blockchain marketplace contract
- **NFT Buying Functionality**: Full support for buying NFTs with both METIS and WMETIS
- **Metis Explorer Integration**: Links to view contracts, tokens, and transactions on Metis Explorer
- **Enhanced User Experience**: Improved error handling, loading states, and transaction notifications
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
- **ThirdWeb SDK (v4)**: SDK for seamless Web3 integration
  - `@thirdweb-dev/react`: React components and hooks for Web3 functionality
  - `@thirdweb-dev/sdk`: Core SDK for blockchain interactions
- **Ethers.js 5.7.2**: Ethereum library for blockchain interaction
- **Metis Blockchain**: Layer 2 scaling solution for Ethereum with lower fees and faster transactions
- **Smart Contract ABIs**: Direct interaction with marketplace contracts using their ABIs

### Transaction Management
- **Custom Transaction System**: Real-time transaction notifications and error handling
- **Wallet Integration**: Secure connection to MetaMask and other Web3 wallets
- **Multi-Currency Support**: METIS (native) and WMETIS (wrapped) payment options

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

Delphi is built on the Metis Andromeda network (chain ID 1088), a Layer 2 scaling solution for Ethereum that offers:

- **Lower Gas Fees**: More cost-effective than Ethereum mainnet
- **Faster Transactions**: Higher throughput and quicker confirmations
- **Ethereum Compatibility**: Compatible with EVM tools and standards
- **Decentralization**: Maintains security through Optimistic Rollup technology

### Smart Contract Integration

The marketplace directly integrates with the following contracts:

- **Marketplace Contract**: `0x7e9EE861e3721F9F3664C18A539e63aCb784a208`
- **WMETIS Contract**: `0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481`
- **NFT Contracts**: Various ERC721 and ERC1155 contracts

These contracts are accessed using their ABIs stored in the `src/app/constants/` directory.

### ThirdWeb SDK

The project uses ThirdWeb SDK v4 for wallet connectivity:

```typescript
// Example wallet connection
import { useAddress, useMetamask, useSigner } from "@thirdweb-dev/react";

const WalletButton = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const signer = useSigner();
  
  if (!address) {
    return <button onClick={connectWithMetamask}>Sign In</button>;
  }
  
  return <div>Connected: {address}</div>;
};
```

### Direct Contract Interaction

For marketplace interactions, we use direct ethers.js contract calls:

```typescript
// Example: Buy an NFT with METIS
const buyWithMetis = async (listingId, signer) => {
  // Get the marketplace contract with signer
  const marketplaceContract = getMarketplaceContract(signer);
  
  // Execute the purchase transaction
  const tx = await marketplaceContract.buyFromListing(
    listingId,
    buyerAddress,
    1, // quantity
    currencyAddress,
    priceInWei,
    { value: priceInWei }
  );
  
  // Wait for transaction confirmation
  const receipt = await tx.wait();
  return receipt;
};
```

## 🧠 Development Guidelines

1. **Component Structure**: Follow atomic design principles
2. **TypeScript**: Use proper typing for all components and functions
3. **Styling**: Use Tailwind classes and follow design system
4. **Web3**: Use ThirdWeb hooks for wallet connection, direct contract calls for transactions
5. **Testing**: Write tests for critical components and functions
6. **Animation**: Use Framer Motion for complex animations

## 🔧 Key Dependencies

- `next`: 14.1.0
- `react`: 18.3+
- `ethers`: 5.7.2 (exact version for ThirdWeb compatibility)
- `@thirdweb-dev/react`: 4.9.4
- `@thirdweb-dev/sdk`: 4.0.99
- `framer-motion`: 12.4.10
- `tailwindcss`: 3.3.0

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
