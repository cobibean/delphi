# enableFeeAmount

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/enableFeeAmount](https://portal.thirdweb.com/references/typescript/v5/uniswap/enableFeeAmount)*

* References
* enableFeeAmount

Prepares a transaction to call the "enableFeeAmount" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ enableFeeAmount }from"thirdweb/extensions/uniswap";consttransaction=enableFeeAmount({contract,fee:...,tickSpacing:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionenableFeeAmount(options:BaseTransactionOptions<|EnableFeeAmountParams|{asyncParams:()=>Promise<EnableFeeAmountParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "enableFeeAmount" function.

### Type

`letoptions:BaseTransactionOptions<|EnableFeeAmountParams|{asyncParams:()=>Promise<EnableFeeAmountParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

