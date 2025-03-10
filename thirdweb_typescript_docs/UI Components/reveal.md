# reveal

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/reveal](https://portal.thirdweb.com/references/typescript/v5/erc721/reveal)*

* References
* reveal

Reveals a previously lazy minted batch of NFTs.

## Example

`import{ reveal }from"thirdweb/extensions/erc721";consttransaction=awaitreveal({contract: contract,batchId:0,password:"password",});const{transactionHash}=awaitsendTransaction({transaction,account,});`
#### Signature

`functionreveal(options:BaseTransactionOptions<RevealParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

{RevealParams} - The reveal parameters.

### Type

`letoptions:BaseTransactionOptions<RevealParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The prepared transaction to send.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

