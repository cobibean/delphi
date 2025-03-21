# NFT Minting Implementation Migration Plan

## Overview

This document outlines a detailed plan for migrating the thirdweb NFT minting template functionality into our existing application. We'll integrate the core components and functionality from the template into our `mintzone` directory, ensuring compatibility with our existing architecture.

## Template Analysis & Architecture

The thirdweb NFT minting template is a Next.js application built with:

- **UI/Components**: React components for the minting interface (using Shadcn UI)
- **SDK Integration**: thirdweb SDK for blockchain interaction
- **State Management**: React hooks for managing component state
- **Contract Interaction**: Functions for interacting with NFT contracts

### Key Components in Template

1. **NFT Contract Interactions**
   - `ContractInteraction.tsx`: Handles core minting functionality
   - Connection to multiple wallet providers
   - Multiple mint types support (claim, signature-based, etc.)

2. **UI Components**
   - `MintingUI.tsx`: Main UI wrapper for the minting experience
   - `NFTCard.tsx`: Display component for NFT metadata
   - `Quantity.tsx`: Selection component for minting quantity
   - `ClaimCondition.tsx`: Display for pricing and availability

3. **Hooks & Utils**
   - Custom hooks for contract interaction
   - IPFS formatting utilities
   - Error handling utilities



## Revised Approach

After analyzing both the thirdweb NFT minting template and our existing marketplace-v5.ts implementation, we've decided to stay closer to the template's approach for better compatibility and simpler integration. Here are the key changes to our initial plan:

1. **Component-Centric Logic**: 
   - Keep most logic within UI components rather than creating separate service functions
   - Use ThirdWeb React hooks and components directly in the UI
   - Minimize abstraction layers to match the template's approach

2. **ThirdWeb React Hooks & Components**:
   - Use `<ClaimButton>`, `<NFTMedia>`, and other ThirdWeb components 
   - Leverage ThirdWeb React hooks instead of building custom service wrappers
   - Follow the template's pattern of direct ThirdWeb component integration

3. **Simplified Error Handling**:
   - Keep error handling within components like the template does
   - Use toast notifications directly from component event handlers
   - Avoid creating separate complex error handling utilities

4. **Wallet Integration**:
   - Reuse our existing wallet connection header component 
   - Adapt the template to work with our current wallet infrastructure
   - Import our header component that already has wallet connection logic

5. **Template Data Flow Pattern**:
   - Fetch NFT contract metadata and claim conditions in the page component
   - Pass metadata and conditions as props to UI components
   - Avoid creating separate service functions for data fetching

## Revised File Structure

```
src/app/features/nft/
├── mintzone/
│   ├── components/
│   │   ├── MintCard.tsx        // Main minting card (similar to NftMint.tsx in template)
│   │   ├── QuantitySelector.tsx
│   │   └── index.ts
│   ├── page.tsx                // Main page that fetches contract data
```

## Revised Migration Plan

### Phase 1: Component Implementation (5 hours)

1. **Create `MintCard.tsx`**
   ```typescript
   // src/app/features/nft/mintzone/components/MintCard.tsx
   "use client";
   
   import { useState } from "react";
   import { Button } from "@/components/ui/button";
   import { Card } from "@/components/ui/card";
   import { useActiveAccount, ClaimButton, NFTMedia } from "thirdweb/react";
   import { useToast } from "@/components/feedback/Toast/useToast";
   import type { ThirdwebContract } from "thirdweb";
   
   interface IMintCardProps {
     contract: ThirdwebContract;
     displayName: string;
     description: string;
     contractImage: string;
     pricePerToken: number | null;
     currencySymbol: string | null;
     isERC1155: boolean;
     isERC721: boolean;
     tokenId: bigint;
   }
   
   export function MintCard(props: IMintCardProps) {
     const [quantity, setQuantity] = useState(1);
     const [useCustomAddress, setUseCustomAddress] = useState(false);
     const [customAddress, setCustomAddress] = useState("");
     const { toast } = useToast();
     const account = useActiveAccount();
     
     // Mint card implementation following template approach
     // with our UI styling applied
   }
   ```

2. **Create `QuantitySelector.tsx`**
   ```typescript
   // src/app/features/nft/mintzone/components/QuantitySelector.tsx
   "use client";
   
   import { Button } from "@/components/ui/button";
   import { Input } from "@/components/ui/input";
   import { Minus, Plus } from "lucide-react";
   
   interface IQuantitySelectorProps {
     quantity: number;
     setQuantity: (quantity: number) => void;
     min?: number;
     max?: number;
   }
   
   export function QuantitySelector({ 
     quantity, 
     setQuantity,
     min = 1,
     max = 100
   }: IQuantitySelectorProps) {
     // Quantity selector implementation with our UI styling
   }
   ```

3. **Create Component Exports**
   ```typescript
   // src/app/features/nft/mintzone/components/index.ts
   export * from "./MintCard";
   export * from "./QuantitySelector";
   ```

### Phase 2: Page Implementation (3 hours)

1. **Create `page.tsx`**
   ```typescript
   // src/app/features/nft/mintzone/page.tsx
   import { metisChain } from "@/app/config/chain";
   import { client } from "@/app/config/client";
   import { MintCard } from "./components";
   import { getContract } from "thirdweb";
   import { getContractMetadata } from "thirdweb/extensions/common";
   import { getActiveClaimCondition as getActiveClaimCondition1155, isERC1155 } from "thirdweb/extensions/erc1155";
   import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
   import { getActiveClaimCondition as getActiveClaimCondition721, isERC721 } from "thirdweb/extensions/erc721";
   
   // Reuse fetchNFTInfo pattern from template 
   // to get contract metadata and claim conditions
   
   export default async function MintZonePage() {
     // Fetch NFT info using template approach
     // Pass data to MintCard component
   }
   ```

### Phase 3: Integration & Testing (4 hours)

1. **Deploy Test Collection**
   - Create a test NFT collection on Metis Testnet using thirdweb dashboard:
     1. Navigate to [thirdweb dashboard](https://thirdweb.com/dashboard)
     2. Connect wallet to Metis Testnet (ChainID: 59902)
     3. Select "Create a New Contract" and choose "NFT Collection"
     4. Configure collection with:
        - Name: "testNFTmint"
        - Symbol: "TEST"
        - Description: "Test collection for Delphi Mintzone"
        - Upload placeholder image for collection
     5. Set royalty parameters and recipient address
     6. Configure primary sale recipient
     7. Deploy to Metis Testnet

2. **Configure Mint Conditions**
   - Set up mint conditions in thirdweb dashboard:
     1. Navigate to deployed collection
     2. Select "Claim Conditions" tab
     3. Create a phase with:
        - Start time: Immediate
        - Supply: 100 NFTs
        - Price: 0.01 METIS
        - Max per wallet: 5
     4. Save claim conditions

3. **Integration Testing**
   - Test component integration with our wallet providers
   - Test minting flow with proper error handling
   - Verify transaction feedback through toast notifications
   - Test with multiple collection types (ERC721, ERC1155)

## Timeline & Priority

1. **Hour 0-5**: Component implementation
2. **Hour 5-8**: Page implementation 
3. **Hour 8-12**: Testing and integration with deployed test collection

## Design Integration

After the functional implementation is complete and tested, integrate with Delphi's "Cosmic Overload" design system while maintaining the template's component architecture:

1. **Apply Cosmic Styling**:
   - Update template components with our theme styles
   - Add space-themed backgrounds and effects
   - Implement glowing borders and dimensional effects

2. **Animation Effects**:
   - Add energy field animations around NFT cards
   - Implement quantum effects on buttons
   - Add dimensional transitions for state changes

3. **Mobile Responsiveness**:
   - Ensure all components follow our existing responsive patterns
   - Test on various screen sizes to match Delphi's mobile experience

By following this revised approach, we stay much closer to the thirdweb template architecture while still meeting our application needs and design requirements.

## App Integration & Routing

To properly integrate the mintzone with the rest of the application, we need to address both routing and data flow:

### Routing Integration

1. **Update `routes.tsx`**
   ```typescript
   // src/app/routes.tsx
   // Add mintzone route
   {
     path: "/nft/mintzone",
     element: <Suspense fallback={<LoadingSpinner />}>
       <WalletContextProvider>
         <TransactionProvider>
           <NftMintzonePage />
         </TransactionProvider>
       </WalletContextProvider>
     </Suspense>,
   },
   ```

2. **Navigation Entry Points**
   - Add links in the main navigation header
   - Add "Mint NFT" buttons in relevant collection pages
   - Consider a featured section on the homepage for popular collections

3. **Exit Navigation**
   - After successful minting: Redirect to user's collection or transaction success page
   - Minting failure: Stay on page with error displayed
   - Cancel/back navigation: Return to previous page or collections view

### Data Flow Integration

1. **Provider Integration**
   - Ensure mintzone components are wrapped with the necessary providers:
     ```typescript
     // These might already be included in your page layout
     <WalletContextProvider>
       <TransactionProvider>
         <ToastProvider>
           {/* Mintzone components */}
         </ToastProvider>
       </TransactionProvider>
     </WalletContextProvider>
     ```

2. **Context Consumption**
   - Access wallet state from existing context:
     ```typescript
     // In your MintCard component
     import { useWallet } from "@/app/providers/WalletProvider";
     
     // Later in component
     const { wallet, isConnected } = useWallet();
     ```

3. **Transaction Handling**
   - Use the existing transaction provider for tracking blockchain transactions:
     ```typescript
     import { useTransaction } from "@/app/providers/TransactionProvider";
     
     // Later in component
     const { trackTransaction } = useTransaction();
     
     // After mint transaction is sent
     trackTransaction({
       hash: txHash,
       type: "MINT_NFT",
       metadata: {
         contractAddress,
         tokenId
       }
     });
     ```

4. **Header Component**
   - Reuse the existing header with wallet connection:
     ```typescript
     import { Header } from "@/app/components/Header";
     
     // In your page component
     return (
       <>
         <Header />
         <main>
           {/* Mintzone content */}
         </main>
       </>
     );
     ```

## Additional Context for the Implementing Agent

For the agent who will execute this plan, here's the key additional context they should have:

1. **Design System Context**: 
   - The app uses a "Cosmic Overload" design system with dark space themes, glowing elements, and dimensional effects
   - Components should match existing styling patterns in the codebase
   - Review existing marketplace NFT cards for styling reference

2. **Metis Chain Specifics**:
   - Use Chain ID 59902 for Metis Testnet
   - The RPC URL is provided in the chain.ts configuration 
   - Gas fees are significantly lower than Ethereum mainnet
   - You'll need test METIS tokens for deployment and testing

3. **ThirdWeb Dashboard Tips**:
   - When deploying to Metis testnet (Metis Sepolia), ensure your wallet is connected to Metis Testnet
   - Choose the ERC-721 standard for the test collection
   - Use simple claim conditions to make testing easier
   - Pre-mint a few NFTs to have content available immediately

4. **Testing Requirements**:
   - Test with multiple wallets (MetaMask, WalletConnect)
   - Verify transaction flow using the TransactionProvider
   - Test error cases (insufficient funds, rejected transactions)
   - Test with collection that has various mint requirements

5. **marketplace-v5.ts Implementation Pattern**:
   - Follow the pattern in marketplace-v5.ts for handling blockchain interactions
   - Use `getContract()` with client and chain configuration from `client.ts`
   - Implement comprehensive error handling with detailed logging
   - Format transaction responses to match existing patterns
   - Use the `formatIPFSUrl` utility to handle IPFS URLs properly
   - Implement wallet address extraction with multiple fallbacks as seen in the marketplace code
   - Use TypeScript interfaces for consistency in data handling
   - Leverage the thirdweb SDK functions like `getNFT`, `getContractMetadata`, etc.
   - Check allowances for ERC20 tokens when necessary
   - Return standardized response objects with success, transaction hash, and error properties
   - The file shows how to handle various types of blockchain interactions:
     - Contract metadata retrieval
     - NFT metadata fetching and formatting
     - Transaction creation, sending, and confirmation
     - Event listening
     - Error handling with detailed logging

The implementation agent should focus first on functionality and integration with existing services, then move to styling and design integration after core functionality is working properly.

## Implementation Status Update

The following components have been successfully implemented:

### Completed Items
- ✅ Created basic components (MintCard.tsx, QuantitySelector.tsx)
- ✅ Created HomepageMintCard.tsx for homepage integration
- ✅ Implemented page.tsx with server-side data fetching
- ✅ Added routing integration in routes.tsx
- ✅ Added navigation link in Header.tsx
- ✅ Successfully tested with real NFT contracts on Metis Sepolia
- ✅ Ensured compatibility with both ERC721 and ERC1155 tokens
- ✅ Set METIS as the default currency
- ❌ Removed gasless transaction functionality due to integration challenges on testnet

### Pending Items for Future Phases
- Design Integration with "Cosmic Overload" theme
- Toast notifications for better user feedback
- Transaction provider integration
- Enhanced error handling
- Redirect after successful minting

The current implementation provides a functional NFT minting interface that works with the thirdweb SDK and integrates with our existing application. It follows the component-centric approach outlined in the revised migration plan while maintaining compatibility with various NFT contract types.
