# openPack

*Source: [https://portal.thirdweb.com/references/typescript/v5/pack/openPack](https://portal.thirdweb.com/references/typescript/v5/pack/openPack)*

* References
* openPack

Prepares a transaction to call the "openPack" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ openPack }from"thirdweb/extensions/pack";consttransaction=openPack({contract,packId:...,amountToOpen:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionopenPack(options:BaseTransactionOptions<OpenPackParams|{asyncParams:()=>Promise<OpenPackParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "openPack" function.

### Type

`letoptions:BaseTransactionOptions<OpenPackParams|{asyncParams:()=>Promise<OpenPackParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

