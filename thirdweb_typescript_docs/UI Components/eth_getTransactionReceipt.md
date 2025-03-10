# eth_getTransactionReceipt

*Source: [https://portal.thirdweb.com/typescript/v5/eth_getTransactionReceipt](https://portal.thirdweb.com/typescript/v5/eth_getTransactionReceipt)*

Retrieves the transaction receipt for a given transaction hash.
Throws an error if the receipt is not found.

## Example

`import{getRpcClient,eth_getTransactionReceipt,}from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });consttransactionReceipt=awaiteth_getTransactionReceipt(rpcRequest,{hash:"0x...",},);`
#### Signature

`functioneth_getTransactionReceipt(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,params:GetTransactionReceiptParameters,):Promise<TransactionReceipt>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### params

The parameters for retrieving the transaction receipt.

### Type

`letparams:GetTransactionReceiptParameters;`
## Returns

#### Return Type

`letreturnType:{blobGasPrice?:quantity;blobGasUsed?:quantity;blockHash:Hash;blockNumber:quantity;contractAddress:Address|null|undefined;cumulativeGasUsed:quantity;effectiveGasPrice:quantity;from:Address;gasUsed:quantity;logs:Array<Log<quantity,index,false>>;logsBloom:Hex;root?:Hash;status:status;to:Address|null;transactionHash:Hash;transactionIndex:index;type:type;};`A promise that resolves to the transaction receipt.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

