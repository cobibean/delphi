# Toast Component Inventory

This document catalogs all toast and notification-related components in the Delphi codebase after the Mother Toast system migration.

## Core Toast Components

| File Path | Type | Description | Used By | Dependencies |
|-----------|------|-------------|---------|--------------|
| `/src/app/components/feedback/toast/Toast.tsx` | Component | Mother Toast component using Radix UI with Framer Motion | All components via ToastProvider | `@radix-ui/react-toast`, `framer-motion` |
| `/src/app/components/feedback/toast/ToastProvider.tsx` | Component | Toast container/provider for Mother Toast | Layout | `Toast.tsx`, `useToast`, `framer-motion` |
| `/src/app/components/feedback/toast/Toaster.tsx` | Component | Toast rendering component | Layout | `Toast.tsx`, `useToast` |
| `/src/app/components/feedback/toast/useToast.ts` | Hook | Consolidated toast hook for state management | All components | `zustand`, `types.ts` |
| `/src/app/components/feedback/toast/types.ts` | Types | Shared types for Mother Toast system | All toast components | None |

## Migrated Components

| Component | Status | Previous Implementation | Current Implementation |
|-----------|--------|-------------------------|------------------------|
| `TransactionProvider.tsx` | ✅ Migrated | Used custom TransactionNotification | Uses Mother Toast with action buttons |
| `useTransaction.ts` | ✅ Migrated | Used old notification system | Uses Mother Toast |
| `useWallet.ts` | ✅ Migrated | Used old error handling | Uses Mother Toast notifications |
| `WalletConnection.tsx` | ✅ Migrated | Used component-level error states | Uses Mother Toast |
| `TransactionStatus.tsx` | ✅ Migrated | Custom implementation | Uses Mother Toast |
| `ListingOptionsModal.tsx` | ✅ Migrated | Custom implementation | Uses Mother Toast |
| `NFTMarketplaceDashboard.tsx` | ✅ Migrated | Custom implementation | Uses Mother Toast |
| `TrendingTable.tsx` | ✅ Migrated | Custom implementation | Uses Mother Toast |
| `FeaturedCard.tsx` | ✅ Migrated | Custom implementation | Uses Mother Toast |
| `FeaturedSection.tsx` | ✅ Migrated | Custom implementation | Uses Mother Toast |
| `MarketplaceMintWrapper.tsx` | ✅ Migrated | Custom implementation | Uses Mother Toast |
| `direct-listing/page.tsx` | ✅ Migrated | Used TransactionProvider | Uses updated TransactionProvider with Mother Toast |
| `auction/page.tsx` | ✅ Migrated | Used TransactionProvider | Uses updated TransactionProvider with Mother Toast |

## Deprecated Components (Scheduled for Removal)

| File Path | Type | Description | Replacement |
|-----------|------|-------------|-------------|
| `/src/app/ui/toast.tsx` | Component | Old Radix UI toast component | Mother Toast |
| `/src/app/ui/toaster.tsx` | Component | Old toast container | Mother Toast Provider |
| `/src/app/ui/useToast.ts` | Hook | Old toast hook | Mother Toast useToast |
| `/src/app/hooks/useToast.ts` | Hook | Duplicate toast hook | Mother Toast useToast |
| `/src/app/stores/errorStore.ts` | Store | Old error management store | Mother Toast |
| `/src/app/components/feedback/Toast.tsx` | Component | Old toast using Framer Motion | Mother Toast |
| `/src/app/components/feedback/ToastNotification.tsx` | Component | Old enhanced toast | Mother Toast |
| `/src/app/features/marketplace/components/TransactionNotification.tsx` | Component | Old transaction notification | Mother Toast via TransactionProvider |

## Integration Points

### Toast Function API

```typescript
// Example usage of the Mother Toast API
import { useToast } from '@/components/feedback/toast/useToast';

function MyComponent() {
  const { toast } = useToast();
  
  const showSuccess = () => {
    toast.success("Operation successful", {
      description: "Your changes have been saved",
      action: {
        label: "View",
        onClick: () => console.log("Clicked")
      }
    });
  };
  
  const showError = () => {
    toast.error("Something went wrong", {
      description: "Please try again later",
      duration: 10000 // 10 seconds
    });
  };
  
  // Also available: toast.warning(), toast.info(), toast.custom()
}
```

### Transaction Toast Integration

```typescript
// Example of TransactionProvider usage
import { useTransaction } from '@/providers/TransactionProvider';

function MyComponent() {
  const { addTransaction } = useTransaction();
  
  const handleTransaction = async () => {
    // Start transaction
    const txId = addTransaction(
      "loading",
      "Processing your transaction"
    );
    
    try {
      // ... perform transaction
      const txHash = "0x123...";
      
      // Update to success
      addTransaction(
        "success",
        "Transaction successful",
        txHash
      );
    } catch (error) {
      // Update to error
      addTransaction(
        "error",
        "Transaction failed",
        error.txHash
      );
    }
  };
}
```

## Mother Toast Features

- ✅ Multiple toast variants (success, error, warning, info)
- ✅ Customizable action buttons
- ✅ Auto-dismiss functionality with configurable duration
- ✅ Toast limit management (max 3 toasts at once)
- ✅ Toast queue system
- ✅ Smooth animations with Framer Motion
- ✅ TypeScript support
- ✅ React Query error integration
- ✅ Transaction status integration

## Future Enhancements

- Toast persistence across page navigation
- Custom toast themes
- Toast priority levels
- Enhanced analytics integration
- Toast grouping for similar notifications
- Mobile-optimized positioning and interactions 