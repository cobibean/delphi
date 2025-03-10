# getNFT

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/getNFT](https://portal.thirdweb.com/references/typescript/v5/erc721/getNFT)*

* References
* getNFT

Retrieves information about a specific ERC721 non-fungible token (NFT).

## Example

`import{ getNFT }from"thirdweb/extensions/erc721";constnft=awaitgetNFT({contract,tokenId:1n,});`
* 

#### Signature

`functiongetNFT(options:BaseTransactionOptions<{includeOwner?:boolean;tokenByIndex?:boolean;tokenId:bigint;}>,):Promise<NFT>;`
## Parameters

#### options

The options for retrieving the NFT.

### Type

`letoptions:BaseTransactionOptions<{includeOwner?:boolean;tokenByIndex?:boolean;tokenId:bigint;}>;`
## Returns

#### Return Type

`letreturnType:|{id:bigint;metadata:NFTMetadata;owner:string|null;tokenURI:string;type:"ERC721";}|{id:bigint;metadata:NFTMetadata;owner:string|null;supply:bigint;tokenURI:string;type:"ERC1155";};`A promise that resolves to the NFT object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

