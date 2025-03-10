# quoteExactOutput

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/quoteExactOutput](https://portal.thirdweb.com/references/typescript/v5/uniswap/quoteExactOutput)*

* References
* quoteExactOutput

Prepares a transaction to call the "quoteExactOutput" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ quoteExactOutput }from"thirdweb/extensions/uniswap";consttransaction=quoteExactOutput({contract,path:...,amountOut:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionquoteExactOutput(options:BaseTransactionOptions<|QuoteExactOutputParams|{asyncParams:()=>Promise<QuoteExactOutputParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "quoteExactOutput" function.

### Type

`letoptions:BaseTransactionOptions<|QuoteExactOutputParams|{asyncParams:()=>Promise<QuoteExactOutputParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

