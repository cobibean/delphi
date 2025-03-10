# eth_getBlockByHash

*Source: [https://portal.thirdweb.com/typescript/v5/eth_getBlockByHash](https://portal.thirdweb.com/typescript/v5/eth_getBlockByHash)*

Retrieves a block by its hash.

## Example

`import{ getRpcClient, eth_getBlockByHash }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });constblock=awaiteth_getBlockByHash(rpcRequest, {blockHash:"0x...",includeTransactions:true,});`
#### Signature

`functioneth_getBlockByHash(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string}, {Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string}, {Method:"net_listening";Parameters?:undefined;ReturnType:boolean}, {Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`}, {Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`}]>,params:GetBlockByHashParams<TIncludeTransactions>):Promise<{baseFeePerGas:null|bigint;blobGasUsed:bigint;difficulty:bigint;excessBlobGas:bigint;extraData:`0x${string}`;gasLimit:bigint;gasUsed:bigint;hash:`0x${string}`;logsBloom:`0x${string}`;miner:string;mixHash:`0x${string}`;nonce:`0x${string}`;number:bigint;parentBeaconBlockRoot?:`0x${string}`;parentHash:`0x${string}`;receiptsRoot:`0x${string}`;sealFields:Array<`0x${string}`>;sha3Uncles:`0x${string}`;size:bigint;stateRoot:`0x${string}`;timestamp:bigint;totalDifficulty:null|bigint;transactions:TIncludeTransactionsextendstrue?Array<({accessList?:undefined;authorizationList?:undefined;blobVersionedHashes?:undefined;blockHash:`0x${string}`;blockNumber:bigint;chainId?:number;from:string;gas:bigint;gasPrice:bigint;hash:`0x${string}`;input:`0x${string}`;maxFeePerBlobGas?:undefined;maxFeePerGas?:undefined;maxPriorityFeePerGas?:undefined;nonce:number;r:`0x${string}`;s:`0x${string}`;to:null|string;transactionIndex:number;type:"legacy";typeHex:null|(`0x${string}`);v:bigint;value:bigint;yParity?:undefined})|({accessList:AccessList;authorizationList?:undefined;blobVersionedHashes?:undefined;blockHash:`0x${string}`;blockNumber:bigint;chainId:number;from:string;gas:bigint;gasPrice:bigint;hash:`0x${string}`;input:`0x${string}`;maxFeePerBlobGas?:undefined;maxFeePerGas?:undefined;maxPriorityFeePerGas?:undefined;nonce:number;r:`0x${string}`;s:`0x${string}`;to:null|string;transactionIndex:number;type:"eip2930";typeHex:null|(`0x${string}`);v:bigint;value:bigint;yParity:number})|({accessList:AccessList;authorizationList?:undefined;blobVersionedHashes?:undefined;blockHash:`0x${string}`;blockNumber:bigint;chainId:number;from:string;gas:bigint;gasPrice?:undefined;hash:`0x${string}`;input:`0x${string}`;maxFeePerBlobGas?:undefined;maxFeePerGas:bigint;maxPriorityFeePerGas:bigint;nonce:number;r:`0x${string}`;s:`0x${string}`;to:null|string;transactionIndex:number;type:"eip1559";typeHex:null|(`0x${string}`);v:bigint;value:bigint;yParity:number})|({accessList:AccessList;authorizationList?:undefined;blobVersionedHashes:readonlyArray<`0x${string}`>;blockHash:`0x${string}`;blockNumber:bigint;chainId:number;from:string;gas:bigint;gasPrice?:undefined;hash:`0x${string}`;input:`0x${string}`;maxFeePerBlobGas:bigint;maxFeePerGas:bigint;maxPriorityFeePerGas:bigint;nonce:number;r:`0x${string}`;s:`0x${string}`;to:null|string;transactionIndex:number;type:"eip4844";typeHex:null|(`0x${string}`);v:bigint;value:bigint;yParity:number})|({accessList:AccessList;authorizationList:SignedAuthorizationList;blobVersionedHashes?:undefined;blockHash:`0x${string}`;blockNumber:bigint;chainId:number;from:string;gas:bigint;gasPrice?:undefined;hash:`0x${string}`;input:`0x${string}`;maxFeePerBlobGas?:undefined;maxFeePerGas:bigint;maxPriorityFeePerGas:bigint;nonce:number;r:`0x${string}`;s:`0x${string}`;to:null|string;transactionIndex:number;type:"eip7702";typeHex:null|(`0x${string}`);v:bigint;value:bigint;yParity:number})>:Array<`0x${string}`>;transactionsRoot:`0x${string}`;uncles:Array<`0x${string}`>;withdrawals?:Array<Withdrawal>;withdrawalsRoot?:`0x${string}`}>`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### params

The parameters for the block retrieval.

### Type

`letparams:GetBlockByHashParams<TIncludeTransactions>;`
## Returns

#### Return Type

`letreturnType:Promise<{baseFeePerGas:null|bigint;blobGasUsed:bigint;difficulty:bigint;excessBlobGas:bigint;extraData:`0x${string}`;gasLimit:bigint;gasUsed:bigint;hash:`0x${string}`;logsBloom:`0x${string}`;miner:string;mixHash:`0x${string}`;nonce:`0x${string}`;number:bigint;parentBeaconBlockRoot?:`0x${string}`;parentHash:`0x${string}`;receiptsRoot:`0x${string}`;sealFields:Array<`0x${string}`>;sha3Uncles:`0x${string}`;size:bigint;stateRoot:`0x${string}`;timestamp:bigint;totalDifficulty:null|bigint;transactions:TIncludeTransactionsextendstrue?Array<({accessList?:undefined;authorizationList?:undefined;blobVersionedHashes?:undefined;blockHash:`0x${string}`;blockNumber:bigint;chainId?:number;from:string;gas:bigint;gasPrice:bigint;hash:`0x${string}`;input:`0x${string}`;maxFeePerBlobGas?:undefined;maxFeePerGas?:undefined;maxPriorityFeePerGas?:undefined;nonce:number;r:`0x${string}`;s:`0x${string}`;to:null|string;transactionIndex:number;type:"legacy";typeHex:null|(`0x${string}`);v:bigint;value:bigint;yParity?:undefined})|({accessList:AccessList;authorizationList?:undefined;blobVersionedHashes?:undefined;blockHash:`0x${string}`;blockNumber:bigint;chainId:number;from:string;gas:bigint;gasPrice:bigint;hash:`0x${string}`;input:`0x${string}`;maxFeePerBlobGas?:undefined;maxFeePerGas?:undefined;maxPriorityFeePerGas?:undefined;nonce:number;r:`0x${string}`;s:`0x${string}`;to:null|string;transactionIndex:number;type:"eip2930";typeHex:null|(`0x${string}`);v:bigint;value:bigint;yParity:number})|({accessList:AccessList;authorizationList?:undefined;blobVersionedHashes?:undefined;blockHash:`0x${string}`;blockNumber:bigint;chainId:number;from:string;gas:bigint;gasPrice?:undefined;hash:`0x${string}`;input:`0x${string}`;maxFeePerBlobGas?:undefined;maxFeePerGas:bigint;maxPriorityFeePerGas:bigint;nonce:number;r:`0x${string}`;s:`0x${string}`;to:null|string;transactionIndex:number;type:"eip1559";typeHex:null|(`0x${string}`);v:bigint;value:bigint;yParity:number})|({accessList:AccessList;authorizationList?:undefined;blobVersionedHashes:readonlyArray<`0x${string}`>;blockHash:`0x${string}`;blockNumber:bigint;chainId:number;from:string;gas:bigint;gasPrice?:undefined;hash:`0x${string}`;input:`0x${string}`;maxFeePerBlobGas:bigint;maxFeePerGas:bigint;maxPriorityFeePerGas:bigint;nonce:number;r:`0x${string}`;s:`0x${string}`;to:null|string;transactionIndex:number;type:"eip4844";typeHex:null|(`0x${string}`);v:bigint;value:bigint;yParity:number})|({accessList:AccessList;authorizationList:SignedAuthorizationList;blobVersionedHashes?:undefined;blockHash:`0x${string}`;blockNumber:bigint;chainId:number;from:string;gas:bigint;gasPrice?:undefined;hash:`0x${string}`;input:`0x${string}`;maxFeePerBlobGas?:undefined;maxFeePerGas:bigint;maxPriorityFeePerGas:bigint;nonce:number;r:`0x${string}`;s:`0x${string}`;to:null|string;transactionIndex:number;type:"eip7702";typeHex:null|(`0x${string}`);v:bigint;value:bigint;yParity:number})>:Array<`0x${string}`>;transactionsRoot:`0x${string}`;uncles:Array<`0x${string}`>;withdrawals?:Array<Withdrawal>;withdrawalsRoot?:`0x${string}`}>`A promise that resolves to the retrieved block.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

