# completeOwnershipHandover

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/completeOwnershipHandover](https://portal.thirdweb.com/references/typescript/v5/modules/completeOwnershipHandover)*

* References
* completeOwnershipHandover

Prepares a transaction to call the "completeOwnershipHandover" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ completeOwnershipHandover }from"thirdweb/extensions/modules";consttransaction=completeOwnershipHandover({contract,pendingOwner:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncompleteOwnershipHandover(options:BaseTransactionOptions<|CompleteOwnershipHandoverParams|{asyncParams:()=>Promise<CompleteOwnershipHandoverParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "completeOwnershipHandover" function.

### Type

`letoptions:BaseTransactionOptions<|CompleteOwnershipHandoverParams|{asyncParams:()=>Promise<CompleteOwnershipHandoverParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

