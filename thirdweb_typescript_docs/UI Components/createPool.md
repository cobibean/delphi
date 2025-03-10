# createPool

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/createPool](https://portal.thirdweb.com/references/typescript/v5/uniswap/createPool)*

* References
* createPool

Prepares a transaction to call the "createPool" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ createPool }from"thirdweb/extensions/uniswap";consttransaction=createPool({contract,tokenA:...,tokenB:...,fee:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncreatePool(options:BaseTransactionOptions<|CreatePoolParams|{asyncParams:()=>Promise<CreatePoolParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "createPool" function.

### Type

`letoptions:BaseTransactionOptions<CreatePoolParams|{asyncParams:()=>Promise<CreatePoolParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

