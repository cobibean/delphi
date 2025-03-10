# eth_getCode

*Source: [https://portal.thirdweb.com/references/typescript/v5/eth_getCode](https://portal.thirdweb.com/references/typescript/v5/eth_getCode)*

* References
* eth_getCode

Retrieves the bytecode of a smart contract at the specified address.

## Example

`import{ getRpcClient, eth_getCode }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });constbytecode=awaiteth_getCode(rpcRequest, {address:"0x...",});`
#### Signature

`functioneth_getCode(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,params:GetCodeParams,):Promise<`0x${string}`>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### params

The parameters for the eth_getCode method.

### Type

`letparams:GetCodeParams;`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`A promise that resolves to the bytecode of the smart contract.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

