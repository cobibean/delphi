# NFT Factory User Flow - Delphi Style

This user flow outlines how creators will deploy and manage their NFT collections via Delphi's NFT Factory. The design will be consistent with Delphi's existing UI aesthetics—clean, intuitive, and optimized for creators.

---

## 1. Create Modal Trigger

- **Action:** User clicks the "Create" button from the main Delphi navigation.
- **Modal Content:**
  - Presents a clean and minimal modal with options like:
    - “Delphi Mint”
    - “Upload Collection” (for batch flows later)
    - **"Deploy Your NFT Collection"** (primary CTA)
  
---

## 2. Token Standard Selection

- **Screen Title:** "Choose Your NFT Type"
- **Style:** Delphi’s grid layout with animated cards for each option.

### ERC721
- Bullet Points:
  - Unique, one-of-one items
  - Best for art, PFPs, single-edition collectibles
- Illustration: Artwork card preview

### ERC1155
- Bullet Points:
  - Multi-edition or semi-fungible NFTs
  - Ideal for membership passes, in-game items, etc.
- Illustration: Stack of tokens or badges

- **CTA:** Continue button enabled after a selection is made.

---

## 3. Metadata & Config Setup

- **Screen Title:** "Set Up Your Collection"
- **Layout:** Split-panel form layout with preview on the right.

### Fields:
- Cover Image Upload
- Collection Name
- Token Symbol
- Description (optional)
- Royalty Percentage (bps, with slider or input)
- Royalty Recipient (wallet address)
- Default Admin (auto-filled as connected wallet)
- Primary Sale Recipient (optional, defaults to caller)

- **UI Tips:** Tooltips next to each field using Delphi’s native tooltip style.

- **CTA:** "Next: Confirm & Deploy"

---

## 4. Deployment Transaction

- **Screen Title:** "Confirm Deployment"
- **Summary Section:**
  - Token Standard
  - Collection Name & Symbol
  - Fee Breakdown:
    - Flat Deployment Fee
    - Lazy Minting Fee (if applicable)
  - Network: Metis Mainnet (or testnet)

- **CTA:** "Deploy Collection"
  - Triggers a wallet prompt for the single bundled tx
  - Delphi’s toast system provides transaction feedback

---

## 5. Post-Deployment Dashboard

- **Screen Title:** "Your NFT Collection"
- **Card or Tab Layout with Sections:**

### Overview Tab
- Collection Address
- Token Standard
- Royalties Info

### Manage Metadata
- Update image/name/description (if allowed by contract)

### Claim Conditions
- Set mint windows, price, wallet limits

### Lazy Minting
- Upload NFTs
- Batch lazy mint functionality

### Withdraw
- View funds received
- Withdraw button (only visible to saleRecipient)

---

## 6. Persistent Nav + UX Enhancements

- **Header Links:**
  - "My Collections"
  - "Create New"
  - "Dashboard"

- **Responsive Design:**
  - Mobile-first adaptive cards
  - Sticky action buttons for scroll-heavy sections

- **Delphi Elements:**
  - Use shadcn/ui components (cards, buttons, tooltips, tabs)
  - Tailwind for consistent padding, rounded corners, and smooth shadows

---

This end-to-end flow helps users smoothly go from idea to deployment while maintaining Delphi’s clean, confident brand experience.

