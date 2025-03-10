# eth_sendRawTransaction

*Source: [https://portal.thirdweb.com/typescript/v5/eth_sendRawTransaction](https://portal.thirdweb.com/typescript/v5/eth_sendRawTransaction)*

Sends a raw transaction to the Ethereum network.

## Example

`import{ getRpcClient, eth_sendRawTransaction }from"thirdweb/rpc";constrpcRequest=getRpcClient({ client, chain });consttransactionHash=awaiteth_sendRawTransaction(rpcRequest,"0x...",);`
#### Signature

`functioneth_sendRawTransaction(request:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>,signedTransaction:`0x${string}`,):Promise<`0x${string}`>;`
## Parameters

#### request

The EIP1193 request function.

### Type

`letrequest:EIP1193RequestFn<[{Method:"web3_clientVersion";Parameters?:undefined;ReturnType:string;},{Method:"web3_sha3";Parameters:[data:`0x${string}`];ReturnType:string;},{Method:"net_listening";Parameters?:undefined;ReturnType:boolean;},{Method:"net_peerCount";Parameters?:undefined;ReturnType:`0x${string}`;},{Method:"net_version";Parameters?:undefined;ReturnType:`0x${string}`;},]>;`
#### signedTransaction

The signed transaction in hex format.

### Type

`letsignedTransaction:`0x${string}`;`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`A promise that resolves to the transaction hash.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

