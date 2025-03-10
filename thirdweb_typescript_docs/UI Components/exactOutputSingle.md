# exactOutputSingle

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/exactOutputSingle](https://portal.thirdweb.com/references/typescript/v5/uniswap/exactOutputSingle)*

* References
* exactOutputSingle

Prepares a transaction to call the "exactOutputSingle" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ exactOutputSingle }from"thirdweb/extensions/uniswap";consttransaction=exactOutputSingle({contract,params:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionexactOutputSingle(options:BaseTransactionOptions<|ExactOutputSingleParams|{asyncParams:()=>Promise<ExactOutputSingleParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "exactOutputSingle" function.

### Type

`letoptions:BaseTransactionOptions<|ExactOutputSingleParams|{asyncParams:()=>Promise<ExactOutputSingleParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

