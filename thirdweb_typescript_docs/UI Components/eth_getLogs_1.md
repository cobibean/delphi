# eth_getLogs

*Source: [https://portal.thirdweb.com/references/typescript/v5/eth_getLogs](https://portal.thirdweb.com/references/typescript/v5/eth_getLogs)*

* References
* eth_getLogs

Retrieves logs from the Ethereum blockchain based on the specified parameters.

## Example

`import{ getRpcClient, eth_getLogs }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });constlogs=awaiteth_getLogs(rpcRequest, {address:"0x...",fromBlock:123456n,toBlock:123456n,});`
#### Signature

`functioneth_getLogs(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,params:GetLogsParams,):Promise<Array<Log>>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### params

The parameters for retrieving logs.

### Type

`letparams:GetLogsParams;`
## Returns

#### Return Type

`letreturnType:Promise<Array<Log>>;`A promise that resolves to the retrieved logs.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

