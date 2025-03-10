# waitForReceipt

*Source: [https://portal.thirdweb.com/references/typescript/v5/waitForReceipt](https://portal.thirdweb.com/references/typescript/v5/waitForReceipt)*

* References
* waitForReceipt

Waits for the transaction receipt of a given transaction hash on a specific contract.

## Example

`import{ waitForReceipt }from"thirdweb";constreceipt=awaitwaitForReceipt({client,chain,transactionHash:"0x123...",});`
#### Signature

`functionwaitForReceipt(options:{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;}):Promise<TransactionReceipt>;`
## Parameters

#### options

The options for waiting for the receipt.
By default, it's 100 blocks.

### Type

`letoptions:{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;};`
## Returns

#### Return Type

`letreturnType:{blobGasPrice?:quantity;blobGasUsed?:quantity;blockHash:Hash;blockNumber:quantity;contractAddress:Address|null|undefined;cumulativeGasUsed:quantity;effectiveGasPrice:quantity;from:Address;gasUsed:quantity;logs:Array<Log<quantity,index,false>>;logsBloom:Hex;root?:Hash;status:status;to:Address|null;transactionHash:Hash;transactionIndex:index;type:type;};`A promise that resolves with the transaction receipt.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

