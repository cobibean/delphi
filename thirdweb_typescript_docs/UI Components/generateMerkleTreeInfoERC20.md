# generateMerkleTreeInfoERC20

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/generateMerkleTreeInfoERC20](https://portal.thirdweb.com/references/typescript/v5/airdrop/generateMerkleTreeInfoERC20)*

* References
* generateMerkleTreeInfoERC20

Generate merkle tree for a given snapshot.

## Example

`import{ generateMerkleTreeInfoERC20 }from"thirdweb/extensions/airdrop";// snapshot / allowlist of airdrop recipients and amountsconstsnapshot=[{ recipient:"0x...", amount:10},{ recipient:"0x...", amount:15},{ recipient:"0x...", amount:20},];consttokenAddress="0x...";// Address of ERC20 airdrop tokenconst{merkleRoot,snapshotUri}=awaitgenerateMerkleTreeInfoERC20({contract,tokenAddress,snapshot,},);// Optional next steps {See: saveSnapshot and setMerkleRoot functions}// - Save snapshot on-chain (on the airdrop contract uri)// - Set merkle root on the contract to enable claiming`
#### Signature

`functiongenerateMerkleTreeInfoERC20(options:BaseTransactionOptions<GenerateMerkleTreeInfoERC20Params>,):Promise<{merkleRoot:string;snapshotUri:string}>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:BaseTransactionOptions<GenerateMerkleTreeInfoERC20Params>;`
## Returns

#### Return Type

`letreturnType:Promise<{merkleRoot:string;snapshotUri:string}>;`A promise that resolves to the merkle-root and snapshot-uri.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

