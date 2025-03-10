# uploadMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/batchmetadataerc721/uploadMetadata](https://portal.thirdweb.com/references/typescript/v5/batchmetadataerc721/uploadMetadata)*

* References
* uploadMetadata

Uploads metadata for a batch of NFTs.

## Example

`import{ BatchMetadataERC721 }from"thirdweb/modules";consttransaction=BatchMetadataERC721.uploadMetadata({contract,metadatas: [{ name:"My NFT", description:"This is my NFT"}],});awaitsendTransaction({transaction,account,});`
#### Signature

`functionuploadMetadata(options:BaseTransactionOptions<UploadMetadataParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the transaction.

### Type

`letoptions:BaseTransactionOptions<UploadMetadataParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The transaction to upload the metadata.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

