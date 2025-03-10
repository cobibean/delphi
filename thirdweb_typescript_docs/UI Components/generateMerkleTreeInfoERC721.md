# generateMerkleTreeInfoERC721

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/generateMerkleTreeInfoERC721](https://portal.thirdweb.com/references/typescript/v5/airdrop/generateMerkleTreeInfoERC721)*

* References
* generateMerkleTreeInfoERC721

Generate merkle tree for a given snapshot.

## Example

`import{ generateMerkleTreeInfoERC721 }from"thirdweb/extensions/airdrop";// snapshot / allowlist of airdrop recipients and amountsconstsnapshot=[{ recipient:"0x...", tokenId:0},{ recipient:"0x...", tokenId:1},{ recipient:"0x...", tokenId:2},];consttokenAddress="0x...";// Address of ERC721 airdrop tokenconst{merkleRoot,snapshotUri}=awaitgenerateMerkleTreeInfoERC721({contract,tokenAddress,snapshot,});// Optional next steps {See: saveSnapshot and setMerkleRoot functions}// - Save snapshot on-chain (on the airdrop contract uri)// - Set merkle root on the contract to enable claiming`
#### Signature

`functiongenerateMerkleTreeInfoERC721(options:BaseTransactionOptions<GenerateMerkleTreeInfoERC721Params>,):Promise<{merkleRoot:string;snapshotUri:string}>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:BaseTransactionOptions<GenerateMerkleTreeInfoERC721Params>;`
## Returns

#### Return Type

`letreturnType:Promise<{merkleRoot:string;snapshotUri:string}>;`A promise that resolves to the merkle-root and snapshot-uri.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

