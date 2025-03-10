# parseAvatarRecord

*Source: [https://portal.thirdweb.com/references/typescript/v5/ens/parseAvatarRecord](https://portal.thirdweb.com/references/typescript/v5/ens/parseAvatarRecord)*

* References
* parseAvatarRecord

Parses an ENS or similar avatar record. Supports NFT URIs, IPFS scheme, and HTTPS URIs.

## Example

`import{ parseAvatarRecord }from"thirdweb/utils/ens";constavatarUrl=awaitparseAvatarRecord({client,uri:"ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/",});console.log(avatarUrl);// "https://ipfs.io/ipfs/bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/"constavatarUrl2=awaitparseAvatarRecord({client,uri:"eip155:1/erc1155:0xb32979486938aa9694bfc898f35dbed459f44424/10063",});console.log(avatarUrl2);// "https://opensea.io/assets/0xb32979486938aa9694bfc898f35dbed459f44424/10063"`
#### Signature

`functionparseAvatarRecord(options:ParseAvatarOptions,):Promise<null|string>;`
## Parameters

#### options

The options for parsing an ENS avatar record.

### Type

`letoptions:{client:ThirdwebClient;uri:string};`
## Returns

#### Return Type

`letreturnType:Promise<null|string>;`A promise that resolves to the avatar URL, or null if the URI could not be parsed.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

