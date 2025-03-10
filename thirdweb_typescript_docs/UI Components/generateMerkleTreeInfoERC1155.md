# generateMerkleTreeInfoERC1155

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/generateMerkleTreeInfoERC1155](https://portal.thirdweb.com/references/typescript/v5/airdrop/generateMerkleTreeInfoERC1155)*

* References
* generateMerkleTreeInfoERC1155

Generate merkle tree for a given snapshot.

## Example

`import{ generateMerkleTreeInfoERC1155 }from"thirdweb/extensions/airdrop";// snapshot / allowlist of airdrop recipients and amountsconstsnapshot=[{ recipient:"0x...", tokenId:0, amount:10},{ recipient:"0x...", tokenId:1, amount:12},{ recipient:"0x...", tokenId:2, amount:15},];consttokenAddress="0x...";// Address of ERC1155 airdrop tokenconst{merkleRoot,snapshotUri}=awaitgenerateMerkleTreeInfoERC1155({contract,tokenAddress,snapshot,});// Optional next steps {See: saveSnapshot and setMerkleRoot functions}// - Save snapshot on-chain (on the airdrop contract uri)// - Set merkle root on the contract to enable claiming`
#### Signature

`functiongenerateMerkleTreeInfoERC1155(options:BaseTransactionOptions<GenerateMerkleTreeInfoERC1155Params>,):Promise<{merkleRoot:string;snapshotUri:string}>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:BaseTransactionOptions<GenerateMerkleTreeInfoERC1155Params>;`
## Returns

#### Return Type

`letreturnType:Promise<{merkleRoot:string;snapshotUri:string}>;`A promise that resolves to the merkle-root and snapshot-uri.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

