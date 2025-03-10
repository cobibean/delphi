# quoteExactOutputSingle

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/quoteExactOutputSingle](https://portal.thirdweb.com/references/typescript/v5/uniswap/quoteExactOutputSingle)*

* References
* quoteExactOutputSingle

Prepares a transaction to call the "quoteExactOutputSingle" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ quoteExactOutputSingle }from"thirdweb/extensions/uniswap";consttransaction=quoteExactOutputSingle({contract,tokenIn:...,tokenOut:...,fee:...,amountOut:...,sqrtPriceLimitX96:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionquoteExactOutputSingle(options:BaseTransactionOptions<|QuoteExactOutputSingleParams|{asyncParams:()=>Promise<QuoteExactOutputSingleParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "quoteExactOutputSingle" function.

### Type

`letoptions:BaseTransactionOptions<|QuoteExactOutputSingleParams|{asyncParams:()=>Promise<QuoteExactOutputSingleParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

