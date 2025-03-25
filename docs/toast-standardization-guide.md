# Toast Standardization Guide

This guide outlines a step-by-step process to fix duplicate toast notifications in the Delphi application. The goal is to ensure a consistent, simple approach to using toast notifications throughout the codebase.

## Current Problem

- Multiple duplicate toast notifications appear on screen
- Inconsistent import paths across the codebase
- Possible multiple instances of toast state management
- Fallback mechanisms creating extra toasts when used outside proper context

## Standardization Plan: 4 Phases

### Phase 1: Audit Current Usage

1. **Catalog all import styles**
   - ❌ `import { useToast } from '@/components/feedback/Toast/useToast'`
   - ❌ `import { useToast } from '@/app/components/feedback'`
   - ✅ `import { useToast } from '@/components/feedback'` (standardized form)

2. **Count file usage by each pattern**
   | Import Pattern | File Count |
   |----------------|------------|
   | `@/components/feedback/Toast/useToast` | TBD |
   | `@/app/components/feedback` | TBD |
   | `@/components/feedback` | TBD |

3. **Identify export files**
   - `/src/app/components/feedback/index.ts`
   - `/src/app/components/feedback/toast.ts`
   - `/src/app/components/feedback/Toast/index.ts`

### Phase 2: Fix Toast Hook Behavior

1. **Modify the `useToast.ts` hook** to prevent duplicate notifications:

```tsx
// In useToast.ts
export const useToast = (): ToastState => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    // Option 1: Return dummy implementation that doesn't show toasts
    return {
      toasts: [],
      add: () => { console.warn("Toast used outside provider"); },
      remove: () => {},
      update: () => {},
      dismiss: () => {},
      reset: () => {},
      toast: {
        success: () => { console.warn("Toast used outside provider"); },
        error: () => { console.warn("Toast used outside provider"); },
        info: () => { console.warn("Toast used outside provider"); },
        warning: () => { console.warn("Toast used outside provider"); },
        custom: () => { console.warn("Toast used outside provider"); }
      }
    };
  }
  
  return context;
};
```

2. **Ensure Single Provider Initialization**
   - Confirm `ToastProvider` is only used once in the app root layout
   - Remove any other toast providers

### Phase 3: Import Path Standardization

1. **Choose standardized import path**: `@/components/feedback`

2. **Update export files for consistency**:

```tsx
// In /src/app/components/feedback/index.ts
export { default as Toast } from './Toast/Toast';
export { ToastProvider } from './Toast/ToastProvider';
export { useToast } from './Toast/useToast';
export * from './Toast/types';
```

3. **Fix imports in these file categories**:

#### Category 1: Direct useToast imports
Files using: `import { useToast } from '@/components/feedback/Toast/useToast'`

#### Category 2: App namespaced imports
Files using: `import { useToast } from '@/app/components/feedback'`

#### Category 3: Already standardized
Files using: `import { useToast } from '@/components/feedback'`

### Phase 4: Testing and Verification

1. **Test each key section of the application**:
   - Main marketplace pages
   - NFT listing and auction pages
   - Transaction flows
   - Wallet connection

2. **Verify single toast instances**:
   - Perform actions that trigger notifications
   - Confirm no duplicate toasts appear
   - Check browser console for any toast-related warnings

3. **Create automated tests** (optional):
   - Add simple tests to verify toast behavior
   - Test that ToastProvider properly manages toast state

## Implementation Plan

| Task | Priority | Estimated Time | Dependencies |
|------|----------|---------------|--------------|
| Audit import paths | High | 1 hour | None |
| Fix useToast.ts hook | High | 30 min | Audit |
| Update export files | Medium | 15 min | None |
| Fix Category 1 imports | High | 1 hour | Updated exports |
| Fix Category 2 imports | High | 1 hour | Updated exports |
| Test in key sections | High | 1 hour | All fixes |
| Create automated tests | Low | 2 hours | All fixes |

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