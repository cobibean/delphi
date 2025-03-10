# waitForUserOpReceipt

*Source: [https://portal.thirdweb.com/references/typescript/v5/waitForUserOpReceipt](https://portal.thirdweb.com/references/typescript/v5/waitForUserOpReceipt)*

* References
* waitForUserOpReceipt

Wait for the user operation to be mined.

## Example

`import{ waitForUserOpReceipt }from"thirdweb/wallets/smart";constreceipt=awaitwaitForUserOpReceipt({chain,client,userOpHash,});`
#### Signature

`functionwaitForUserOpReceipt(args:BundlerOptions&{intervalMs?:number;timeoutMs?:number;userOpHash:`0x${string}`;},):Promise<TransactionReceipt>;`
## Parameters

#### args

The options and user operation hash

### Type

`letargs:BundlerOptions&{intervalMs?:number;timeoutMs?:number;userOpHash:`0x${string}`;};`
## Returns

#### Return Type

`letreturnType:{blobGasPrice?:quantity;blobGasUsed?:quantity;blockHash:Hash;blockNumber:quantity;contractAddress:Address|null|undefined;cumulativeGasUsed:quantity;effectiveGasPrice:quantity;from:Address;gasUsed:quantity;logs:Array<Log<quantity,index,false>>;logsBloom:Hex;root?:Hash;status:status;to:Address|null;transactionHash:Hash;transactionIndex:index;type:type;};`
* The transaction receipt

The transaction receipt

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

