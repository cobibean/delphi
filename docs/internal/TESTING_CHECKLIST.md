# Delphi Marketplace - Manual Testing Checklist

## Basic Functionality

- [ ] Website loads correctly on desktop browsers (Chrome, Firefox, Safari)
- [ ] Website loads correctly on mobile devices
- [ ] All navigation links work correctly
- [ ] All UI elements render properly

## Wallet Connection

- [ ] Connect wallet button works
- [ ] Multiple wallet options are available (MetaMask, WalletConnect, etc.)
- [ ] Wallet connection status is displayed correctly
- [ ] Wallet address is displayed correctly when connected
- [ ] Wallet can be disconnected properly
- [ ] Connection persists on page refresh
- [ ] Network switching works correctly
- [ ] Error handling for wrong network

## Marketplace Browsing

- [ ] NFT listings are displayed correctly
- [ ] Pagination works correctly
- [ ] Filtering options work correctly
- [ ] Search functionality works correctly
- [ ] NFT details are displayed correctly
- [ ] NFT images load properly
- [ ] Price information is displayed correctly
- [ ] Auction end times are displayed correctly and update in real-time

## NFT Details Page

- [ ] NFT image loads correctly
- [ ] NFT metadata displays correctly
- [ ] Owner information is accurate
- [ ] Price information is accurate
- [ ] Auction details are accurate (if applicable)
- [ ] Transaction history is displayed correctly
- [ ] Related NFTs section works correctly

## Direct Listings

- [ ] Create direct listing UI works (when implemented)
- [ ] Can set price correctly
- [ ] Can set royalty percentage correctly
- [ ] Listing creation transaction works
- [ ] Listing appears in marketplace after creation
- [ ] Can cancel a direct listing
- [ ] Can update a direct listing price

## Auctions

- [ ] Create auction UI works (when implemented)
- [ ] Can set minimum bid correctly
- [ ] Can set auction duration correctly
- [ ] Can set reserve price correctly
- [ ] Auction creation transaction works
- [ ] Auction appears in marketplace after creation
- [ ] Can place a bid on an auction
- [ ] Minimum bid increment works correctly
- [ ] Auction timer counts down correctly
- [ ] Auction ends correctly at the specified time
- [ ] Winner can claim the NFT after auction ends
- [ ] Seller can claim proceeds after auction ends
- [ ] Non-winners can withdraw their bids

## Buying Process

- [ ] Buy Now button works for direct listings
- [ ] Transaction confirmation modal appears
- [ ] Transaction processes correctly
- [ ] Success/failure messages display correctly
- [ ] NFT ownership transfers correctly after purchase
- [ ] Seller receives payment correctly
- [ ] Royalties are distributed correctly

## My NFTs Section

- [ ] All owned NFTs are displayed correctly
- [ ] Can view NFT details from this section
- [ ] Can list owned NFTs for sale
- [ ] Can transfer owned NFTs
- [ ] Newly acquired NFTs appear in this section

## My Listings Section

- [ ] All created listings are displayed correctly
- [ ] Can view listing details from this section
- [ ] Can cancel listings from this section
- [ ] Can update listings from this section
- [ ] Sold listings are marked accordingly

## Profile Section

- [ ] Profile information displays correctly
- [ ] Can edit profile information
- [ ] Profile image uploads work correctly
- [ ] Activity history displays correctly

## Error Handling

- [ ] Appropriate error messages for failed transactions
- [ ] Appropriate error messages for network issues
- [ ] Appropriate error messages for insufficient funds
- [ ] Appropriate error messages for unauthorized actions
- [ ] Error recovery paths work correctly

## Performance

- [ ] Page load times are acceptable
- [ ] Image loading is optimized
- [ ] Transaction processing times are acceptable
- [ ] UI remains responsive during transactions
- [ ] No memory leaks during extended usage

## Security

- [ ] Wallet connection is secure
- [ ] Transaction signing is secure
- [ ] No sensitive data is exposed in the frontend
- [ ] API endpoints are properly secured
- [ ] Smart contract interactions are secure

## Cross-browser Compatibility

- [ ] All functionality works in Chrome
- [ ] All functionality works in Firefox
- [ ] All functionality works in Safari
- [ ] All functionality works in Edge

## Mobile Responsiveness

- [ ] All pages are usable on mobile devices
- [ ] UI elements adapt correctly to different screen sizes
- [ ] Touch interactions work correctly
- [ ] Mobile wallet connections work correctly

## Accessibility

- [ ] Proper contrast ratios for text
- [ ] Alt text for images
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility

## Notes

- Add specific test cases for any custom functionality
- Document any known issues or limitations
- Update this checklist as new features are added 