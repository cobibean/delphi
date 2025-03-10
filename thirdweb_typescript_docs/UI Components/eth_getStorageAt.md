# eth_getStorageAt

*Source: [https://portal.thirdweb.com/typescript/v5/eth_getStorageAt](https://portal.thirdweb.com/typescript/v5/eth_getStorageAt)*

Retrieves the value stored at a specific position in the storage of a contract.

## Example

`import{ getRpcClient, eth_getStorageAt }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });conststorageValue=awaiteth_getStorageAt(rpcRequest, {address:"0x...",position:0n,});`
#### Signature

`functioneth_getStorageAt(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,params:GetStorageAtParams,):Promise<`0x${string}`>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### params

The parameters for the eth_getStorageAt method.

### Type

`letparams:GetStorageAtParams;`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`A promise that resolves to the value stored at the specified position.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

