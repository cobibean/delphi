# fetchProofsERC1155

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/fetchProofsERC1155](https://portal.thirdweb.com/references/typescript/v5/airdrop/fetchProofsERC1155)*

* References
* fetchProofsERC1155

Retrieves the claim merkle proof for the provided address.

## Example

`import{ fetchProofsERCC1155 }from"thirdweb/extensions/airdrop";import{ getContract, defineChain }from"thirdweb";constTOKEN=getContracct({client,chain:defineChain(1),address:"0x...",});constmerkleRoot=awaittokenMerkleRoot({contract:TOKEN,tokenAddress:TOKEN.address,});constproof=awaitfetchProofsERC1155({contract:TOKEN,recipient:"0x...",merkleRoot,});`
#### Signature

`functionfetchProofsERC1155(options:{contract:Readonly;merkleRoot:string;recipient:string;}):Promise<null|ClaimProofERC1155>;`
## Parameters

#### options

### Type

`letoptions:{contract:Readonly;merkleRoot:string;recipient:string;};`
## Returns

#### Return Type

`letreturnType:Promise<null|ClaimProofERC1155>;`A promise that resolves to the proof or null if the recipient is not in the allowlist

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

