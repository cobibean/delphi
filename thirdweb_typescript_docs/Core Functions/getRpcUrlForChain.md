# getRpcUrlForChain

*Source: [https://portal.thirdweb.com/references/typescript/v5/getRpcUrlForChain](https://portal.thirdweb.com/references/typescript/v5/getRpcUrlForChain)*

* References
* getRpcUrlForChain

Retrieves the RPC URL for the specified chain.
If a custom RPC URL is defined in the options, it will be used.
Otherwise, a thirdweb RPC URL will be constructed using the chain ID and client ID.

## Example

`import{ getRpcUrlForChain }from"thirdweb/chains";constrpcUrl=getRpcUrlForChain({ chain:1, client });console.log(rpcUrl);// "https://1.rpc.thirdweb.com/...`
#### Signature

`functiongetRpcUrlForChain(options:GetRpcUrlForChainOptions):string;`
## Parameters

#### options

The options object containing the chain and client information.

### Type

`letoptions:GetRpcUrlForChainOptions;`
## Returns

#### Return Type

`letreturnType:string;`The RPC URL for the specified chain.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

