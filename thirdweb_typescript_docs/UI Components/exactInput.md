# exactInput

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/exactInput](https://portal.thirdweb.com/references/typescript/v5/uniswap/exactInput)*

* References
* exactInput

Prepares a transaction to call the "exactInput" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ exactInput }from"thirdweb/extensions/uniswap";consttransaction=exactInput({contract,params:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionexactInput(options:BaseTransactionOptions<|ExactInputParams|{asyncParams:()=>Promise<ExactInputParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "exactInput" function.

### Type

`letoptions:BaseTransactionOptions<ExactInputParams|{asyncParams:()=>Promise<ExactInputParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

