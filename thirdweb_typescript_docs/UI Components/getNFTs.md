# getNFTs

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/getNFTs](https://portal.thirdweb.com/references/typescript/v5/erc721/getNFTs)*

* References
* getNFTs

Retrieves an array of NFTs ("ERC721") based on the provided options.

## Example

`import{ getNFTs }from"thirdweb/extensions/erc721";constnfts=awaitgetNFTs({contract,start:0,count:10,});`
#### Signature

`functiongetNFTs(options:BaseTransactionOptions<GetNFTsParams>,):Promise<Array<NFT>>;`
## Parameters

#### options

The options for retrieving the NFTs.

### Type

`letoptions:BaseTransactionOptions<GetNFTsParams>;`
## Returns

#### Return Type

`letreturnType:|{id:bigint;metadata:NFTMetadata;owner:string|null;tokenURI:string;type:"ERC721";}|{id:bigint;metadata:NFTMetadata;owner:string|null;supply:bigint;tokenURI:string;type:"ERC1155";};`A promise that resolves to an array of NFTs.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

