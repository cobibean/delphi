# quoteExactInput

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/quoteExactInput](https://portal.thirdweb.com/references/typescript/v5/uniswap/quoteExactInput)*

* References
* quoteExactInput

Prepares a transaction to call the "quoteExactInput" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ quoteExactInput }from"thirdweb/extensions/uniswap";consttransaction=quoteExactInput({contract,path:...,amountIn:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionquoteExactInput(options:BaseTransactionOptions<|QuoteExactInputParams|{asyncParams:()=>Promise<QuoteExactInputParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "quoteExactInput" function.

### Type

`letoptions:BaseTransactionOptions<|QuoteExactInputParams|{asyncParams:()=>Promise<QuoteExactInputParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

