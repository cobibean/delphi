# sendBatchTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/sendBatchTransaction](https://portal.thirdweb.com/references/typescript/v5/sendBatchTransaction)*

* References
* sendBatchTransaction

Sends a batch transaction using the provided options.

## Example

`import{ sendBatchTransaction }from"thirdweb";constwaitForReceiptOptions=awaitsendBatchTransaction({account,transactions,});`
#### Signature

`functionsendBatchTransaction(options:SendBatchTransactionOptions,):Promise<{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;}>;`
## Parameters

#### options

The options for sending the batch transaction.

### Type

`letoptions:{account:Account;transactions:Array<PreparedTransaction>;};`
## Returns

#### Return Type

`letreturnType:Promise<{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;}>;`A promise that resolves to the options for waiting for the receipt of the first transaction in the batch.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

