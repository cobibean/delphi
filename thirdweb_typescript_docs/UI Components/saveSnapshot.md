# saveSnapshot

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/saveSnapshot](https://portal.thirdweb.com/references/typescript/v5/airdrop/saveSnapshot)*

* References
* saveSnapshot

Generate merkle tree for a given snapshot and save the info on-chain.

## Example

`// This is ERC20 example. Should import and use other ERC variants as neededimport{ generateMerkleTreeInfoERC20, saveSnapshot, setMerkleRoot }from"thirdweb/extensions/airdrop";// snapshot / allowlist of airdrop recipients and amountsconstsnapshot=[{ recipient:"0x...", amount:10},{ recipient:"0x...", amount:15},{ recipient:"0x...", amount:20},];consttokenAddress="0x..."// Address of airdrop tokenconst{merkleRoot,snapshotUri}=awaitgenerateMerkleTreeInfoERC20({contract,tokenAddress,snapshot});constsaveSnapshotTransaction=saveSnapshot({contract,merkleRoot,snapshotUri,});awaitsendTransaction({ saveSnapshotTransaction, account });constsetMerkleRootTransaction=setMerkleRoot({contract,token,tokenMerkleRoot: merkleRootas`0x${string}`,resetClaimStatus:false// toggle as neededsignature,});awaitsendTransaction({ setMerkleRootTransaction, account });`
#### Signature

`functionsaveSnapshot(options:BaseTransactionOptions<SaveSnapshotParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:BaseTransactionOptions<SaveSnapshotParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the transaction result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

