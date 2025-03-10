# eth_maxPriorityFeePerGas

*Source: [https://portal.thirdweb.com/references/typescript/v5/eth_maxPriorityFeePerGas](https://portal.thirdweb.com/references/typescript/v5/eth_maxPriorityFeePerGas)*

* References
* eth_maxPriorityFeePerGas

Retrieves the maximum priority fee per gas from the Ethereum network.

## Example

`import{ getRpcClient, eth_maxPriorityFeePerGas }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });constmaxPriorityFeePerGas=awaiteth_maxPriorityFeePerGas(rpcRequest);`
#### Signature

`functioneth_maxPriorityFeePerGas(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,):Promise<bigint>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to a bigint representing the maximum priority fee per gas.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

