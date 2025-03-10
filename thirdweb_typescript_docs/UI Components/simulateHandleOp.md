# simulateHandleOp

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/simulateHandleOp](https://portal.thirdweb.com/references/typescript/v5/erc4337/simulateHandleOp)*

* References
* simulateHandleOp

Prepares a transaction to call the "simulateHandleOp" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ simulateHandleOp }from"thirdweb/extensions/erc4337";consttransaction=simulateHandleOp({contract,op:...,target:...,targetCallData:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsimulateHandleOp(options:BaseTransactionOptions<|SimulateHandleOpParams|{asyncParams:()=>Promise<SimulateHandleOpParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "simulateHandleOp" function.

### Type

`letoptions:BaseTransactionOptions<|SimulateHandleOpParams|{asyncParams:()=>Promise<SimulateHandleOpParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

