# getAllOwners

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/getAllOwners](https://portal.thirdweb.com/references/typescript/v5/erc721/getAllOwners)*

* References
* getAllOwners

Retrieves the owners of all ERC721 tokens within a specified range.

## Example

`import{ getAllOwners }from"thirdweb/extensions/erc721";constowners=awaitgetAllOwners({contract,start:0,count:10,});`
#### Signature

`functiongetAllOwners(options:BaseTransactionOptions<GetAllOwnersParams>,):Promise<Array<{owner:string;tokenId:bigint}>>;`
## Parameters

#### options

The options for retrieving the owners.

### Type

`letoptions:BaseTransactionOptions<GetAllOwnersParams>;`
## Returns

#### Return Type

`letreturnType:Promise<Array<{owner:string;tokenId:bigint}>>;`A promise that resolves to an array of objects containing the token ID and owner address.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

