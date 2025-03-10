# createDelayedRevealBatch

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/createDelayedRevealBatch](https://portal.thirdweb.com/references/typescript/v5/erc721/createDelayedRevealBatch)*

* References
* createDelayedRevealBatch

Creates a batch of encrypted NFTs that can be revealed at a later time.

## Example

`import{ createDelayedRevealBatch }from"thirdweb/extensions/erc721";constplaceholderNFT={name:"Hidden NFT",description:"Will be revealed next week!"};constrealNFTs=[{name:"Common NFT #1",description:"Common NFT, one of many.",image: ipfs://...,}, {name:"Super Rare NFT #2",description:"You got a Super Rare NFT!",image: ipfs://...,}];consttransaction=createDelayedRevealBatch({contract,placeholderMetadata: placeholderNFT,metadata: realNFTs,password:"password123",});const{transactionHash}=awaitsendTransaction({ transaction, account });`
#### Signature

`functioncreateDelayedRevealBatch(options:BaseTransactionOptions<CreateDelayedRevealBatchParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

{CreateDelayedRevealBatchParams} - The delayed reveal options.

### Type

`letoptions:BaseTransactionOptions<CreateDelayedRevealBatchParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The prepared transaction to send.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

