# Toast Standardization Guide

This guide outlines a step-by-step process to fix duplicate toast notifications in the Delphi application. The goal is to ensure a consistent, simple approach to using toast notifications throughout the codebase.

## Current Problem

- Multiple duplicate toast notifications appear on screen
- Inconsistent import paths across the codebase:
  - `@/components/feedback/Toast/useToast`
  - `@/app/components/feedback`
  - `@/components/feedback`
- Multiple export files creating confusion:
  - `/src/app/components/feedback/index.ts`
  - `/src/app/components/feedback/toast.ts`
  - `/src/app/components/feedback/Toast/index.ts`
  - `/src/app/components/feedback/hooks/index.ts`
- The useToast hook's fallback mechanism creates separate toast instances when used outside a provider
- TransactionProvider directly generates toasts while managing its own state

## Standardization Plan: 4 Phases

### Phase 1: Audit Current Usage ✅

1. **Catalog all import styles**
   - ❌ `import { useToast } from '@/components/feedback/Toast/useToast'`
   - ❌ `import { useToast } from '@/app/components/feedback'`
   - ✅ `import { useToast } from '@/components/feedback'` (standardized form)

2. **Count file usage by each pattern**
   | Import Pattern | File Count |
   |----------------|------------|
   | `@/components/feedback/Toast/useToast` | 12 files |
   | `@/app/components/feedback` | 2 files |
   | `@/components/feedback` | 4 files |

3. **Identify export files**
   - `/src/app/components/feedback/index.ts`
   - `/src/app/components/feedback/toast.ts`
   - `/src/app/components/feedback/Toast/index.ts`
   - `/src/app/components/feedback/hooks/index.ts`

### Phase 2: Fix Toast Hook Behavior ✅

1. **Modify the `useToast.ts` hook** to prevent duplicate notifications:

```tsx
// In useToast.ts
export const useToast = (): ToastState => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    // Return a dummy implementation that just logs warnings
    console.warn("Toast used outside provider context - notifications suppressed");
    return {
      toasts: [],
      add: () => { console.warn("Toast used outside provider - notification suppressed"); },
      remove: () => { console.warn("Toast remove called outside provider"); },
      update: () => { console.warn("Toast update called outside provider"); },
      dismiss: () => { console.warn("Toast dismiss called outside provider"); },
      reset: () => { console.warn("Toast reset called outside provider"); },
      toast: {
        success: () => { console.warn("Toast success called outside provider - notification suppressed"); },
        error: () => { console.warn("Toast error called outside provider - notification suppressed"); },
        info: () => { console.warn("Toast info called outside provider - notification suppressed"); },
        warning: () => { console.warn("Toast warning called outside provider - notification suppressed"); },
        custom: () => { console.warn("Toast custom called outside provider - notification suppressed"); }
      }
    };
  }
  
  return context;
};
```

2. **Verify Single Provider Initialization** ✅
   - Confirmed `ToastProvider` is only used once in the app root layout
   - No other toast providers found in feature-specific layouts

### Phase 3: Import Path Standardization ✅

1. **Choose standardized import path** ✅
   - Selected `@/components/feedback` as the standard path
   - This is already correctly exported in feedback/index.ts 

2. **Verify export files for consistency** ✅
   - `/src/app/components/feedback/index.ts` already has correct exports:
   ```tsx
   export { default as Toast } from './Toast/Toast';
   export { ToastProvider } from './Toast/ToastProvider';
   export { useToast } from './Toast/useToast';
   export * from './Toast/types';
   ```

3. **Fix imports in these file categories**:

#### Category 1: Direct useToast imports (Complete ✅)
Files updated:
- ✅ `/src/app/features/marketplace/providers/MarketplaceMintWrapper.tsx`
- ✅ `/src/app/features/marketplace/components/TransactionStatus.tsx`
- ✅ `/src/app/features/nft/hooks/useMintNFT.ts`
- ✅ `/src/app/features/nft/components/NFTCard.tsx`
- ✅ `/src/app/features/nft/components/AuctionActions.tsx` 
- ✅ `/src/app/features/nft/components/NFTCarousel.tsx`
- ✅ `/src/app/features/marketplace/hooks/useMarketplaceMint.ts`
- ✅ `/src/app/features/nft/components/NFTDetailView.tsx`
- ✅ `/src/app/features/marketplace/hooks/useMarketplaceWallet.ts`
- ✅ `/src/app/features/marketplace/components/FeaturedSection/FeaturedCard.tsx`
- ✅ `/src/app/features/marketplace/components/NFTMarketplaceDashboard.tsx`
- ✅ `/src/app/features/marketplace/components/TrendingTable/TrendingTable.tsx`

#### Category 2: App namespaced imports (Complete ✅)
Files updated:
- ✅ `/src/app/features/wallet/hooks/useWallet.ts`
- ✅ `/src/app/providers/TransactionProvider.tsx`

#### Category 3: Already standardized
Files already using the correct path: `import { useToast } from '@/components/feedback'`
- `/src/app/create/auction/page.tsx`
- `/src/app/create/direct-listing/page.tsx`
- `/src/app/features/wallet/hooks/useTransaction.ts`
- `/src/app/features/marketplace/components/ListingOptionsModal.tsx`

### Phase 4: Testing and Verification (Ready for Testing)

A comprehensive testing plan has been created to verify that the toast standardization has resolved the duplicate notification issues.

See the [Toast Testing Plan](../toast-testing-plan.md) document for detailed testing steps covering:

1. **Basic Toast Functionality**:
   - Success, error, info, warning, and custom toasts
   - Multiple toasts in sequence

2. **Transaction-Related Toasts**:
   - Wallet connection
   - Transaction submissions, confirmations, and failures

3. **Marketplace Actions**:
   - NFT listings
   - Auction creation and bidding
   - NFT purchases

4. **Console Monitoring**:
   - No toast-related errors
   - No warnings about toasts outside provider context

5. **Edge Cases**:
   - Rapid toast triggering
   - Multiple simultaneous transactions
   - Page navigation with active toasts
   - Modal interactions

Follow the testing plan to verify that all issues have been resolved and document any remaining problems.

## Implementation Plan

| Task | Priority | Estimated Time | Dependencies | Status |
|------|----------|---------------|--------------|--------|
| Audit import paths | High | 1 hour | None | ✅ Complete |
| Fix useToast.ts hook | High | 30 min | Audit | ✅ Complete |
| Update export files | Medium | 15 min | None | ✅ Complete |
| Fix Category 1 imports | High | 1 hour | Updated exports | ✅ Complete |
| Fix Category 2 imports | High | 1 hour | Updated exports | ✅ Complete |
| Create test plan | Medium | 30 min | All fixes | ✅ Complete |
| Test in key sections | High | 1 hour | All fixes | 🔄 Ready |
| Create automated tests | Low | 2 hours | All fixes | ⏳ Not Started |

## Best Practices Going Forward

1. **Always use the standardized import path**:
   ```tsx
   import { useToast } from '@/components/feedback';
   ```

2. **Never import directly from the implementation file**:
   ```tsx
   // DON'T do this
   import { useToast } from '@/components/feedback/Toast/useToast';
   ```

3. **Only use ToastProvider in the app root layout**:
   - The provider should wrap the entire application
   - Never add additional providers in page components

4. **Use the toast API consistently**:
   ```tsx
   const { toast } = useToast();
   
   // For success messages
   toast.success("Operation successful", "Optional description");
   
   // For errors
   toast.error("Something went wrong", "Error details");
   
   // For warnings
   toast.warning("Warning message", "Warning details");
   
   // For information
   toast.info("Information message", "Information details");
   ```

5. **Avoid using the standalone export directly**

## Toast System Architecture

The "Mother Toast" system uses:
- A centralized toast state management
- A single ToastProvider at the application root
- A consistent API for showing different toast types
- Animation effects with Framer Motion
- A queue system for multiple notifications
- Auto-dismiss functionality with configurable duration

By following this standardization guide, we'll ensure a consistent, reliable toast notification system throughout the Delphi application. 