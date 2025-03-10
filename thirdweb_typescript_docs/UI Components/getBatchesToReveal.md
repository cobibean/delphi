# getBatchesToReveal

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/getBatchesToReveal](https://portal.thirdweb.com/references/typescript/v5/erc721/getBatchesToReveal)*

* References
* getBatchesToReveal

Retrieves the batches available to reveal in an NFT contract.

## Example

`import{ getBatchesToReveal }from"thirdweb/extensions/erc721";constbatches=awaitgetBatchesToReveal({ contract: contract });const{transactionHash}=awaitsendTransaction({transaction,account,});`
#### Signature

`functiongetBatchesToReveal(options:BaseTransactionOptions,):Promise<Array<BatchToReveal>>;`
## Parameters

#### options

{BaseTransactionOptions} - The transaction options.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:{batchId:bigint;batchUri:string;placeholderMetadata:undefined|NFTMetadata;};`A promise resolving to an array of unrevealed batches.

Use thebatchIdand corresponding password for each batch to reveal it withreveal. reveal

`batchId``reveal`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

