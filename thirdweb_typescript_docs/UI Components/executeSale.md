# executeSale

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/executeSale](https://portal.thirdweb.com/references/typescript/v5/marketplace/executeSale)*

* References
* executeSale

Executes a sale for an English auction.

## Example

`import{ executeSale }from"thirdweb/extensions/marketplace";import{ sendTransaction }from"thirdweb";consttransaction=executeSale({contract,auctionId:0n,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionexecuteSale(options:BaseTransactionOptions<ExecuteSaleParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for executing the sale.

### Type

`letoptions:BaseTransactionOptions<ExecuteSaleParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction that can be sent to execute the sale.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

