# eth_estimateGas

*Source: [https://portal.thirdweb.com/references/typescript/v5/eth_estimateGas](https://portal.thirdweb.com/references/typescript/v5/eth_estimateGas)*

* References
* eth_estimateGas

Estimates the gas required to execute a transaction on the Ethereum network.

## Example

`import{ getRpcClient, eth_estimateGas }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });constgas=awaiteth_estimateGas(rpcRequest, {to:"0x...",...});`
#### Signature

`functioneth_estimateGas(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,transactionRequest:RpcTransactionRequest,):Promise<bigint>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### transactionRequest

The transaction request object.

### Type

`lettransactionRequest:RpcTransactionRequest;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the estimated gas as a bigint.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

