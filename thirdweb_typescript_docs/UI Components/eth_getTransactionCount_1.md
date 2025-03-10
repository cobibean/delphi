# eth_getTransactionCount

*Source: [https://portal.thirdweb.com/references/typescript/v5/eth_getTransactionCount](https://portal.thirdweb.com/references/typescript/v5/eth_getTransactionCount)*

* References
* eth_getTransactionCount

Retrieves the transaction count (nonce) for a given Ethereum address.

## Example

`import{ getRpcClient, eth_getTransactionCount }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });consttransactionCount=awaiteth_getTransactionCount(rpcRequest, {address:"0x...",});`
#### Signature

`functioneth_getTransactionCount(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,params:GetTransactionCountParameters,):Promise<number>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### params

The parameters for retrieving the transaction count.

### Type

`letparams:GetTransactionCountParameters;`
## Returns

#### Return Type

`letreturnType:Promise<number>;`A promise that resolves to the transaction count as a number.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

