# Marketplace Buy Method Standardization Plan

## Current Issues Identified

1. **Conflicting Implementations**
   - `buyWithMetis()` in marketplace-v5.ts uses direct METIS payments
   - `wrapAndBuy()` in useMarketplaceMint.ts uses WMETIS (wrapped METIS)
   - Different parameter structures and transaction preparation methods

2. **Inconsistent Transaction Parameters**
   - Direct method uses ThirdWeb's `buyFromListing` helper
   - WMETIS method uses custom `prepareContractCall` with different parameters

## Standardization Plan

### 1. Choose Single Implementation Method

We will standardize on using direct METIS payments because:
- Simpler user experience (no wrapping required)
- Matches ThirdWeb's reference implementation
- Fewer transaction steps (1 vs 3)
- Lower gas costs
- Better alignment with ThirdWeb's marketplace extension

### 2. Code Refactoring Steps

1. **Consolidate Buy Functions**
   ```typescript
   // In marketplace-v5.ts
   export const buyListing = async (
     listingId: string,
     quantity: number = 1,
     wallet: any
   ): Promise<{
     transactionHash: string,
     success: boolean,
     receipt: any
   }> => {
     // Implementation using ThirdWeb's buyFromListing
   }
   ```

2. **Remove WMETIS Implementation**
   - Deprecate `useMarketplaceMint.ts`
   - Remove WMETIS-related code and constants
   - Update all import references

3. **Standardize Error Handling**
   ```typescript
   try {
     // Validation
     if (!wallet?.getAccount()) throw new Error('No connected wallet');
     if (!listing) throw new Error('Listing not found');
     
     // Price validation
     const balance = await getBalance(wallet.getAccount());
     if (balance < totalPrice) throw new Error('Insufficient balance');
     
     // Chain validation
     if (activeChain?.id !== metisChain.id) {
       await switchChain(metisChain);
     }
   } catch (error) {
     // Standardized error handling
   }
   ```

### 3. Implementation Updates

1. **Update NFTCard Component**
   - Remove WMETIS buy option
   - Use single standardized buy method
   - Update loading states and error handling

2. **Update NFTDetailView Component**
   - Consolidate payment options
   - Remove WMETIS-related UI elements
   - Standardize transaction feedback

### 4. Testing Requirements

1. **Unit Tests**
   - Test buy function with various listing states
   - Validate error handling
   - Test price calculations

2. **Integration Tests**
   - Test complete buy flow
   - Verify transaction success
   - Check NFT transfer completion

3. **Edge Cases**
   - Insufficient balance
   - Invalid listing ID
   - Network switching
   - Transaction failures

### 5. Documentation Updates

1. **Code Documentation**
   - Update JSDoc comments
   - Add clear examples
   - Document error cases

2. **User Documentation**
   - Update buying guide
   - Remove WMETIS references
   - Add troubleshooting section

### 6. Migration Plan

1. **Phase 1: Preparation**
   - Create new standardized buy function
   - Add deprecation warnings to old methods
   - Update dependencies

2. **Phase 2: Implementation**
   - Deploy new buy method
   - Update all components to use new method
   - Add monitoring for errors

3. **Phase 3: Cleanup**
   - Remove old WMETIS implementation
   - Clean up unused constants
   - Remove deprecated warnings

### 7. Monitoring & Maintenance

1. **Transaction Monitoring**
   - Track success/failure rates
   - Monitor gas costs
   - Track user feedback

2. **Performance Metrics**
   - Transaction completion time
   - Error frequency
   - User interaction metrics

## Timeline

1. **Week 1**: Implementation of standardized buy method
2. **Week 2**: Component updates and testing
3. **Week 3**: Documentation and monitoring setup
4. **Week 4**: Gradual rollout and cleanup

## Success Criteria

1. All marketplace purchases use single standardized method
2. Zero references to WMETIS in buying flow
3. Improved transaction success rate
4. Reduced user friction in buying process
5. Comprehensive error handling and user feedback

## Rollback Plan

1. **Trigger Conditions**
   - Critical bugs in new implementation
   - Significant increase in failed transactions
   - User-reported critical issues

2. **Rollback Steps**
   - Revert to previous implementation
   - Restore WMETIS functionality
   - Notify users of temporary reversion

## Future Considerations

1. **Multi-token Support**
   - Plan for future token support
   - Maintain extensible architecture
   - Document token integration process

2. **Gas Optimization**
   - Monitor gas costs
   - Implement batch transactions
   - Optimize contract interactions 