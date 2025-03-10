# fetchProofsERC721

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/fetchProofsERC721](https://portal.thirdweb.com/references/typescript/v5/airdrop/fetchProofsERC721)*

* References
* fetchProofsERC721

Retrieves the claim merkle proof for the provided address.

## Example

`import{ fetchProofsERC721 }from"thirdweb/extensions/airdrop";import{ getContract, defineChain }from"thirdweb";constNFT=getContracct({client,chain:defineChain(1),address:"0x...",});constmerkleRoot=awaittokenMerkleRoot({contract:NFT,tokenAddress:NFT.address,});constproof=awaitfetchProofsERC721({contract:NFT,recipient:"0x...",merkleRoot,});`
#### Signature

`functionfetchProofsERC721(options:{contract:Readonly;merkleRoot:string;recipient:string;}):Promise<null|ClaimProofERC721>;`
## Parameters

#### options

### Type

`letoptions:{contract:Readonly;merkleRoot:string;recipient:string;};`
## Returns

#### Return Type

`letreturnType:Promise<null|ClaimProofERC721>;`A promise that resolves to the proof or null if the recipient is not in the allowlist

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

