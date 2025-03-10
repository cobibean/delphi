# setContractMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/setContractMetadata](https://portal.thirdweb.com/references/typescript/v5/common/setContractMetadata)*

* References
* setContractMetadata

Sets the metadata for a contract.

## Example

`import{ setContractMetadata }from"@thirdweb/extensions/common";import{ sendTransaction }from"thirdweb";consttransaction=setContractMetadata({contract,name:"My NFT",symbol:"NFT",});// Send the transactionawaitsendTransaction({transaction,account,});`
#### Signature

`functionsetContractMetadata(options:BaseTransactionOptions<SetContractMetadataParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for setting the contract metadata.

### Type

`letoptions:BaseTransactionOptions<SetContractMetadataParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
* The prepared transaction to set the contract metadata.

The prepared transaction to set the contract metadata.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

