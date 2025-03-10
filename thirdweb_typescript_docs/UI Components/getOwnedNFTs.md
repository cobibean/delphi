# getOwnedNFTs

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/getOwnedNFTs](https://portal.thirdweb.com/references/typescript/v5/erc721/getOwnedNFTs)*

* References
* getOwnedNFTs

Retrieves the owned NFTs for a given owner.
This extension only works with ERC721 contracts that support thetokenOfOwnerByIndexmethod

`tokenOfOwnerByIndex`
## Example

`import{ getOwnedNFTs }from"thirdweb/extensions/erc721";constownedNFTs=awaitgetOwnedNFTs({contract,owner:"0x1234...",});`
#### Signature

`functiongetOwnedNFTs(options:BaseTransactionOptions<BalanceOfParams>,):Promise<Array<NFT>>;`
## Parameters

#### options

The options for retrieving the owned NFTs.

### Type

`letoptions:BaseTransactionOptions<BalanceOfParams>;`
## Returns

#### Return Type

`letreturnType:|{id:bigint;metadata:NFTMetadata;owner:string|null;tokenURI:string;type:"ERC721";}|{id:bigint;metadata:NFTMetadata;owner:string|null;supply:bigint;tokenURI:string;type:"ERC1155";};`A promise that resolves to an array of NFTs owned by the specified owner.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

