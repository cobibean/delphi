# setSharedMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/openeditionmetadataerc721/setSharedMetadata](https://portal.thirdweb.com/references/typescript/v5/openeditionmetadataerc721/setSharedMetadata)*

* References
* setSharedMetadata

Prepares a transaction to call the "setSharedMetadata" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ OpenEditionMetadataERC721 }from"thirdweb/modules";consttransaction=OpenEditionMetadataERC721.setSharedMetadata({contract,metadata:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetSharedMetadata(options:BaseTransactionOptions<|SetSharedMetadataParams|{asyncParams:()=>Promise<SetSharedMetadataParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setSharedMetadata" function.

### Type

`letoptions:BaseTransactionOptions<|SetSharedMetadataParams|{asyncParams:()=>Promise<SetSharedMetadataParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

