# parseNftUri

*Source: [https://portal.thirdweb.com/references/typescript/v5/ens/parseNftUri](https://portal.thirdweb.com/references/typescript/v5/ens/parseNftUri)*

* References
* parseNftUri

Parses an NFT URI.

## Example

`import{ parseNftUri }from"thirdweb/utils/ens";constnftUri=awaitparseNftUri({client,uri:"eip155:1/erc1155:0xb32979486938aa9694bfc898f35dbed459f44424/10063",});console.log(nftUri);// ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/`
#### Signature

`functionparseNftUri(options:{client:ThirdwebClient;uri:string;}):Promise<null|string>;`
## Parameters

#### options

The options for parsing an NFT URI.

### Type

`letoptions:{client:ThirdwebClient;uri:string};`
## Returns

#### Return Type

`letreturnType:Promise<null|string>;`A promise that resolves to the NFT URI, or null if the URI could not be parsed.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

