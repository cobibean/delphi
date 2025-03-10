# mintAdditionalSupplyToBatch

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/mintAdditionalSupplyToBatch](https://portal.thirdweb.com/references/typescript/v5/erc1155/mintAdditionalSupplyToBatch)*

* References
* mintAdditionalSupplyToBatch

This extension batches multiplemintAdditionalSupplyToBatchextensions into one single multicall.
Keep in mind that there is a limit of how many NFTs you can mint per transaction.
This limit varies depends on the network that you are transacting on.

`mintAdditionalSupplyToBatch`You are recommended to experiment with the number to figure out the best number for your chain of choice.

## Example

`import{ mintAdditionalSupplyToBatch }from"thirdweb/extensions/erc1155";consttransaction=mintAdditionalSupplyToBatch({contract,nfts: [{ tokenId:0n, supply:99n, to: account.address },{ tokenId:1n, supply:98n, to: account.address },{ tokenId:2n, supply:97n, to: account.address },],});`
#### Signature

`functionmintAdditionalSupplyToBatch(options:BaseTransactionOptions<MintAdditionalSupplyToBatchParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

### Type

`letoptions:BaseTransactionOptions<MintAdditionalSupplyToBatchParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

