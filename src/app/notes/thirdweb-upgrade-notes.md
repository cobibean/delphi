# ThirdWeb SDK Update Notes

## Issue

We encountered an error when clicking on the NFT details button:

```
Server Error
Error: Cannot find module './vendor-chunks/@noble.js'
Require stack:
- /Users/cobibean/DEV/delphi/.next/server/webpack-runtime.js
- /Users/cobibean/DEV/delphi/.next/server/app/nft/[id]/page.js
- /Users/cobibean/DEV/delphi/node_modules/next/dist/server/require.js
...
```

This was caused by an incompatibility with the thirdweb SDK in our `useMarketplaceMint.ts` file.

## Temporary Fix

We've implemented a temporary fix by replacing the complex `wrapAndBuy` function with a simplified placeholder version that doesn't actually perform the blockchain transactions. This allows the UI to function without errors while we work on a proper fix.

## Root Cause

The error was due to using the `prepareMulticall` function, which is either:

1. No longer available in the version of thirdweb we're using, or
2. Available but requires a different import pattern or usage pattern

## Proper Fix

To properly fix this issue, we need to:

1. Check which version of thirdweb we're using:
   ```bash
   npm list thirdweb
   ```

2. Refer to the thirdweb documentation for that specific version to understand how to batch transactions correctly.

3. Implement the correct approach for batching transactions. The current recommended approach seems to be:
   - Execute transactions sequentially (deposit WMETIS, approve, buy)
   - OR use the account abstraction batching functionality if using smart accounts

## Resources

- [ThirdWeb TypeScript SDK Documentation](https://portal.thirdweb.com/typescript)
- [Account Abstraction Batching Transactions](https://portal.thirdweb.com/connect/account-abstraction/batching-transactions)
- [Preparing Transactions](https://portal.thirdweb.com/typescript/v5/transactions/prepare)

## Next Steps

1. Research the correct version of thirdweb and corresponding documentation
2. Implement a proper transaction sequence in `useMarketplaceMint.ts`
3. Test the full purchase flow with real transactions on the testnet before deploying to production 