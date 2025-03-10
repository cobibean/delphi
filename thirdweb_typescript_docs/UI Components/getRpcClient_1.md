# getRpcClient

*Source: [https://portal.thirdweb.com/references/typescript/v5/getRpcClient](https://portal.thirdweb.com/references/typescript/v5/getRpcClient)*

* References
* getRpcClient

Returns an RPC request that can be used to make JSON-RPC requests.

## Example

`import{ createThirdwebClient }from"thirdweb";import{ getRpcClient }from"thirdweb/rpc";import{ ethereum }from"thirdweb/chains";constclient=createThirdwebClient({ clientId:"..."});constrpcRequest=getRpcClient({ client, chain: ethereum });constblockNumber=awaitrpcRequest({method:"eth_blockNumber",});`
#### Signature

`functiongetRpcClient(options:Readonly,):EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
## Parameters

#### options

The RPC options.

### Type

`letoptions:Readonly;`
## Returns

#### Return Type

`letreturnType:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`The RPC request function.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

