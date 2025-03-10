# eth_blockNumber

*Source: [https://portal.thirdweb.com/references/typescript/v5/eth_blockNumber](https://portal.thirdweb.com/references/typescript/v5/eth_blockNumber)*

* References
* eth_blockNumber

Retrieves the current block number from the Ethereum blockchain.

## Example

`import{ getRpcClient, eth_blockNumber }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });constblockNumber=awaiteth_blockNumber(rpcRequest);`
#### Signature

`functioneth_blockNumber(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,):Promise<bigint>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the current block number as a bigint.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

