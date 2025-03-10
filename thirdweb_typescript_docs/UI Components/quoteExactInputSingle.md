# quoteExactInputSingle

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/quoteExactInputSingle](https://portal.thirdweb.com/references/typescript/v5/uniswap/quoteExactInputSingle)*

* References
* quoteExactInputSingle

Prepares a transaction to call the "quoteExactInputSingle" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ quoteExactInputSingle }from"thirdweb/extensions/uniswap";consttransaction=quoteExactInputSingle({contract,tokenIn:...,tokenOut:...,fee:...,amountIn:...,sqrtPriceLimitX96:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionquoteExactInputSingle(options:BaseTransactionOptions<|QuoteExactInputSingleParams|{asyncParams:()=>Promise<QuoteExactInputSingleParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "quoteExactInputSingle" function.

### Type

`letoptions:BaseTransactionOptions<|QuoteExactInputSingleParams|{asyncParams:()=>Promise<QuoteExactInputSingleParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

