# defineChain

*Source: [https://portal.thirdweb.com/references/typescript/v5/defineChain](https://portal.thirdweb.com/references/typescript/v5/defineChain)*

* References
* defineChain

Defines a chain with the given options.

## Example

Just pass the chain ID to connect to:

`constchain=defineChain(1);`Or pass your own RPC or custom values:

`constchain=defineChain({id:1,rpc:"https://my-rpc.com",nativeCurrency: {name:"Ether",symbol:"ETH",decimals:18,},});`
#### Signature

`functiondefineChain(options:number|Chain|ChainOptions|LegacyChain,):Readonly;`
## Parameters

#### options

The options for the chain.

### Type

`letoptions:number|Chain|ChainOptions|LegacyChain;`
## Returns

#### Return Type

`letreturnType:Readonly;`The defined chain.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

