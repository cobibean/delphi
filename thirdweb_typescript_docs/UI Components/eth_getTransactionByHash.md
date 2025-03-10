# eth_getTransactionByHash

*Source: [https://portal.thirdweb.com/typescript/v5/eth_getTransactionByHash](https://portal.thirdweb.com/typescript/v5/eth_getTransactionByHash)*

Retrieves a transaction by its hash.

## Example

`import{ getRpcClient, eth_getTransactionByHash }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });consttransaction=awaiteth_getTransactionByHash(rpcRequest, {hash:"0x...",});`
#### Signature

`functioneth_getTransactionByHash(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,params:GetTransactionByHashParameters,):Promise<Transaction>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### params

The parameters for retrieving the transaction.

### Type

`letparams:GetTransactionByHashParameters;`
## Returns

#### Return Type

`letreturnType:Promise<Transaction>;`A promise that resolves to the transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

