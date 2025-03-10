# sendAndConfirmTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/sendAndConfirmTransaction](https://portal.thirdweb.com/references/typescript/v5/sendAndConfirmTransaction)*

* References
* sendAndConfirmTransaction

Sends a transaction using the provided wallet.

## Example

### Basic usage

`import{ sendAndConfirmTransaction }from"thirdweb";consttransactionReceipt=awaitsendAndConfirmTransaction({account,transaction,});`
### Gasless usage withthirdweb Engine

`consttransactionReceipt=awaitsendAndConfirmTransaction({account,transaction,gasless: {provider:"engine",relayerUrl:"https://thirdweb.engine-***.thirdweb.com/relayer/***",relayerForwarderAddress:"0x...",},});`
### Gasless usage with OpenZeppelin

`consttransactionReceipt=awaitsendAndConfirmTransaction({account,transaction,gasless: {provider:"openzeppelin",relayerUrl:"https://...",relayerForwarderAddress:"0x...",},});`
#### Signature

`functionsendAndConfirmTransaction(options:SendTransactionOptions,):Promise<TransactionReceipt>;`
## Parameters

#### options

The options for sending the transaction.

### Type

`letoptions:{account:Account;gasless:GaslessOptions;transaction:PreparedTransaction<any>;};`
## Returns

#### Return Type

`letreturnType:{blobGasPrice?:quantity;blobGasUsed?:quantity;blockHash:Hash;blockNumber:quantity;contractAddress:Address|null|undefined;cumulativeGasUsed:quantity;effectiveGasPrice:quantity;from:Address;gasUsed:quantity;logs:Array<Log<quantity,index,false>>;logsBloom:Hex;root?:Hash;status:status;to:Address|null;transactionHash:Hash;transactionIndex:index;type:type;};`A promise that resolves to the confirmed transaction receipt.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

