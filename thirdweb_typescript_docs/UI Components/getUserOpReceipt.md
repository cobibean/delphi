# getUserOpReceipt

*Source: [https://portal.thirdweb.com/references/typescript/v5/getUserOpReceipt](https://portal.thirdweb.com/references/typescript/v5/getUserOpReceipt)*

* References
* getUserOpReceipt

Get the receipt of a user operation.

## Example

`import{ getUserOpReceipt }from"thirdweb/wallets/smart";constreceipt=awaitgetUserOpReceipt({client,chain,userOpHash,});`
#### Signature

`functiongetUserOpReceipt(args:BundlerOptions&{userOpHash:`0x${string}`},):Promise<undefined|TransactionReceipt>;`
## Parameters

#### args

The options for getting the receipt of a user operation.

### Type

`letargs:BundlerOptions&{userOpHash:`0x${string}`};`
## Returns

#### Return Type

`letreturnType:{blobGasPrice?:quantity;blobGasUsed?:quantity;blockHash:Hash;blockNumber:quantity;contractAddress:Address|null|undefined;cumulativeGasUsed:quantity;effectiveGasPrice:quantity;from:Address;gasUsed:quantity;logs:Array<Log<quantity,index,false>>;logsBloom:Hex;root?:Hash;status:status;to:Address|null;transactionHash:Hash;transactionIndex:index;type:type;};`The receipt of the user operation.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

