# claimToBatch

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/claimToBatch](https://portal.thirdweb.com/references/typescript/v5/erc721/claimToBatch)*

* References
* claimToBatch

This extension batches multipleclaimToextensions into one single multicall.
Keep in mind that there is a limit of how many NFTs you can claim per transaction.
This limit varies depends on the network that you are transacting on.

`claimTo`You are recommended to experiment with the number to figure out the best number for your chain of choice.

## Example

`import{ claimToBatch }from"thirdweb/extensions/erc721";consttransaction=claimToBatch({contract: nftDropContract,from: claimer.address,// address of the one calling this transactioncontent: [{ to:"0x...1", quantity:1n},{ to:"0x...2", quantity:12n},{ to:"0x...3", quantity:2n},],});`
#### Signature

`functionclaimToBatch(options:BaseTransactionOptions<ClaimToBatchParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

the transaction options

### Type

`letoptions:BaseTransactionOptions<ClaimToBatchParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the transaction result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

