# setOwner

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/setOwner](https://portal.thirdweb.com/references/typescript/v5/uniswap/setOwner)*

* References
* setOwner

Prepares a transaction to call the "setOwner" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setOwner }from"thirdweb/extensions/uniswap";consttransaction=setOwner({contract,newOwner:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetOwner(options:BaseTransactionOptions<SetOwnerParams|{asyncParams:()=>Promise<SetOwnerParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setOwner" function.

### Type

`letoptions:BaseTransactionOptions<SetOwnerParams|{asyncParams:()=>Promise<SetOwnerParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

