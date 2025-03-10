# mintToBatch

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/mintToBatch](https://portal.thirdweb.com/references/typescript/v5/erc1155/mintToBatch)*

* References
* mintToBatch

This extension batches multiplemintToextensions into one single multicall.
Keep in mind that there is a limit of how many NFTs you can mint per transaction.
This limit varies depends on the network that you are transacting on.

`mintTo`You are recommended to experiment with the number to figure out the best number for your chain of choice.

## Example

`import{ mintBatchTo }from"thirdweb/extension/erc1155";consttransaction=mintToBatch({contract: editionContract,to:"0x...",nfts: [{metadata: {name:"Token #0",image:"...",attributes: [],},supply:100n,},{metadata: {name:"Token #1",image:"...",attributes: [],},supply:111n,},],});awaitsendTransaction({ transaction, account });`
#### Signature

`functionmintToBatch(options:BaseTransactionOptions<MintToBatchParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

the transaction options

### Type

`letoptions:BaseTransactionOptions<MintToBatchParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the transaction result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

