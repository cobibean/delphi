# updateTokenURI

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/updateTokenURI](https://portal.thirdweb.com/references/typescript/v5/erc721/updateTokenURI)*

* References
* updateTokenURI

This function is an abstracted layer of thesetTokenURIextension,
which means it usessetTokenURIunder the hood.
While thesetTokenURImethod only takes in a uri string, this extension takes in a user-friendlyNFTInput,
upload that content to IPFS and pass the IPFS URI (of saidNFTInput) to the underlyingsetTokenURImethod.

`setTokenURI``setTokenURI``setTokenURI``NFTInput``NFTInput``setTokenURI`This extension does not validate the NFTInput so make sure you are passing the proper content that you want to update.

## Example

`import{ updateTokenURI }from"thirdweb/extensions/erc721";consttransaction=updateTokenURI({tokenId:0n,nft: {name:"new name",description:"new description",image:"https://image-host.com/new-image.png",},});`
#### Signature

`functionupdateTokenURI(options:BaseTransactionOptions<UpdateTokenURIParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

### Type

`letoptions:BaseTransactionOptions<UpdateTokenURIParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`the prepared transaction fromsetTokenURI

`setTokenURI`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

