# unpublishContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/thirdweb/unpublishContract](https://portal.thirdweb.com/references/typescript/v5/thirdweb/unpublishContract)*

* References
* unpublishContract

Prepares a transaction to call the "unpublishContract" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ unpublishContract }from"thirdweb/extensions/thirdweb";consttransaction=unpublishContract({contract,publisher:...,contractId:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionunpublishContract(options:BaseTransactionOptions<|UnpublishContractParams|{asyncParams:()=>Promise<UnpublishContractParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "unpublishContract" function.

### Type

`letoptions:BaseTransactionOptions<|UnpublishContractParams|{asyncParams:()=>Promise<UnpublishContractParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

