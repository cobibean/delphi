# eth_getBalance

*Source: [https://portal.thirdweb.com/references/typescript/v5/eth_getBalance](https://portal.thirdweb.com/references/typescript/v5/eth_getBalance)*

* References
* eth_getBalance

Retrieves the balance of the specified Ethereum address.

## Example

`import{ getRpcClient, eth_getBalance }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });constbalance=awaiteth_getBalance(rpcRequest, {address:"0x...",});`
#### Signature

`functioneth_getBalance(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,params:GetBalanceParams,):Promise<bigint>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### params

The parameters for retrieving the balance.

### Type

`letparams:{address:string};`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the balance of the address in wei as bigint.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

