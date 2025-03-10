# updateMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/updateMetadata](https://portal.thirdweb.com/references/typescript/v5/erc721/updateMetadata)*

* References
* updateMetadata

Update the metadata of the single token in an NFT Drop (DropERC721) collection
For NFT Collection, please usesetTokenURI

`setTokenURI`
## Example

`import{ updateMetadata }from"thirdweb/extensions/erc721";consttransaction=updateMetadata({contract,targetTokenId:0n,client: thirdwebClient,newMetadata: {name:"this is the new nft name",description:"...",image:"new image uri",// ...},});`
#### Signature

`functionupdateMetadata(options:BaseTransactionOptions<UpdateMetadataParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

### Type

`letoptions:BaseTransactionOptions<UpdateMetadataParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`the prepared transaction

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

