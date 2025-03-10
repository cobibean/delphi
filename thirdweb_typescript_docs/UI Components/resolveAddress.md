# resolveAddress

*Source: [https://portal.thirdweb.com/references/typescript/v5/unstoppable-domains/resolveAddress](https://portal.thirdweb.com/references/typescript/v5/unstoppable-domains/resolveAddress)*

* References
* resolveAddress

Resolve an Unstoppable-Domain domain to an Ethereum address

## Example

### Basic usage

`import{ resolveAddress }from"thirdweb/extension/unstoppable-domains";constaddress=awaitresolveAddress({client,name:"thirdweb.crypto",});`
### Custom resolver

By default this extension will try to resolve the name on Polygon mainnet,
you can decide to customize the resolver contract by specifyingresolverAddressandresolverChain

`resolverAddress``resolverChain``import{ ethereum }from"thirdweb/chains";constaddress=awaitresolveAddress({client,name:"thirdweb.crypto",resolverAddress:"0x...",resolverChain: ethereum,});`
#### Signature

`functionresolveAddress(options:ResolveAddressOptions,):Promise<string>;`
## Parameters

#### options

The options for resolving an UD domain

### Type

`letoptions:{client:ThirdwebClient;name:string;resolverAddress?:string;resolverChain?:Chain;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The Ethereum address associated with the domain name.Learn more

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

