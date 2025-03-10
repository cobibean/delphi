# fetchProofsERC20

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/fetchProofsERC20](https://portal.thirdweb.com/references/typescript/v5/airdrop/fetchProofsERC20)*

* References
* fetchProofsERC20

Retrieves the claim merkle proof for the provided address.

## Example

`import{ fetchProofsERCC20 }from"thirdweb/extensions/airdrop";import{ getContract, defineChain }from"thirdweb";constTOKEN=getContracct({client,chain:defineChain(1),address:"0x...",});constmerkleRoot=awaittokenMerkleRoot({contract:TOKEN,tokenAddress:TOKEN.address,});constproof=awaitfetchProofsERC20({contract:TOKEN,recipient:"0x...",merkleRoot,});`
#### Signature

`functionfetchProofsERC20(options:{contract:Readonly;merkleRoot:string;recipient:string;tokenDecimals:number;}):Promise<null|ClaimProofERC20>;`
## Parameters

#### options

### Type

`letoptions:{contract:Readonly;merkleRoot:string;recipient:string;tokenDecimals:number;};`
## Returns

#### Return Type

`letreturnType:Promise<null|ClaimProofERC20>;`A promise that resolves to the proof or null if the recipient is not in the allowlist

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

