# exactInputSingle

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/exactInputSingle](https://portal.thirdweb.com/references/typescript/v5/uniswap/exactInputSingle)*

* References
* exactInputSingle

Prepares a transaction to call the "exactInputSingle" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ exactInputSingle }from"thirdweb/extensions/uniswap";consttransaction=exactInputSingle({contract,params:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionexactInputSingle(options:BaseTransactionOptions<|ExactInputSingleParams|{asyncParams:()=>Promise<ExactInputSingleParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "exactInputSingle" function.

### Type

`letoptions:BaseTransactionOptions<|ExactInputSingleParams|{asyncParams:()=>Promise<ExactInputSingleParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

