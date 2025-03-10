# eth_call

*Source: [https://portal.thirdweb.com/references/typescript/v5/eth_call](https://portal.thirdweb.com/references/typescript/v5/eth_call)*

* References
* eth_call

Executes a call or a transaction on the Ethereum network.

## Example

`import{ getRpcClient, eth_call }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });constresult=awaiteth_call(rpcRequest, {to:"0x...",...});`
#### Signature

`functioneth_call(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,params:Partial<RpcTransactionRequest>&{blockNumber?:number|bigint;blockTag?:BlockTag|undefined;stateOverrides?:StateOverride;},):Promise<`0x${string}`>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### params

The parameters for the call or transaction.

### Type

`letparams:Partial<RpcTransactionRequest>&{blockNumber?:number|bigint;blockTag?:BlockTag|undefined;stateOverrides?:StateOverride;};`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`A promise that resolves to the result of the call or transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

