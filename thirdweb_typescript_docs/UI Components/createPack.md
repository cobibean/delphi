# createPack

*Source: [https://portal.thirdweb.com/references/typescript/v5/pack/createPack](https://portal.thirdweb.com/references/typescript/v5/pack/createPack)*

* References
* createPack

Prepares a transaction to call the "createPack" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ createPack }from"thirdweb/extensions/pack";consttransaction=createPack({contract,contents:...,numOfRewardUnits:...,packUri:...,openStartTimestamp:...,amountDistributedPerOpen:...,recipient:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncreatePack(options:BaseTransactionOptions<|CreatePackParams|{asyncParams:()=>Promise<CreatePackParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "createPack" function.

### Type

`letoptions:BaseTransactionOptions<CreatePackParams|{asyncParams:()=>Promise<CreatePackParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

