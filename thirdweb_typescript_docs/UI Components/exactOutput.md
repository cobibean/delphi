# exactOutput

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/exactOutput](https://portal.thirdweb.com/references/typescript/v5/uniswap/exactOutput)*

* References
* exactOutput

Prepares a transaction to call the "exactOutput" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ exactOutput }from"thirdweb/extensions/uniswap";consttransaction=exactOutput({contract,params:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionexactOutput(options:BaseTransactionOptions<|ExactOutputParams|{asyncParams:()=>Promise<ExactOutputParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "exactOutput" function.

### Type

`letoptions:BaseTransactionOptions<|ExactOutputParams|{asyncParams:()=>Promise<ExactOutputParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

