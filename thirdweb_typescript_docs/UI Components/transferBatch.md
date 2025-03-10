# transferBatch

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/transferBatch](https://portal.thirdweb.com/references/typescript/v5/erc20/transferBatch)*

* References
* transferBatch

Transfers a batch of ERC20 tokens from the sender's address to the specified recipient address.

## Example

`import{ transferBatch }from"thirdweb/extensions/erc20";import{ sendTransaction }from"thirdweb";consttransaction=transferBatch({contract,batch: [{to:"0x...",amount:100,},{to:"0x...",amount:"0.1",},]);awaitsendTransaction({ transaction, account });`
#### Signature

`functiontransferBatch(options:BaseTransactionOptions<{batch:Array<{to:string}&(|{amount:string|number}|{amountWei:bigint})>;}>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the batch transfer transaction.

### Type

`letoptions:BaseTransactionOptions<{batch:Array<{to:string}&(|{amount:string|number}|{amountWei:bigint})>;}>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the prepared transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

