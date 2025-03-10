# resolveName

*Source: [https://portal.thirdweb.com/references/typescript/v5/unstoppable-domains/resolveName](https://portal.thirdweb.com/references/typescript/v5/unstoppable-domains/resolveName)*

* References
* resolveName

Resolves the primary Untoppable-Domains name for a specified address.

## Example

### Basic usage

`import{ resolveName }from"thirdweb/extension/unstoppable-domains";constname=awaitresolveName({client,address:"0x...",});`
### Custom resolver

By default this extension will try to resolve the address on Polygon mainnet,
you can decide to customize the resolver contract by specifyingresolverAddressandresolverChain

`resolverAddress``resolverChain``import{ ethereum }from"thirdweb/chains";constaddress=awaitresolveName({client,address:"0x...",resolverAddress:"0x...",resolverChain: ethereum,});`
#### Signature

`functionresolveName(options:ResolveUDNameOptions):Promise<string>;`
## Parameters

#### options

The options for resolving an UD domain

### Type

`letoptions:{address:string;client:ThirdwebClient;resolverAddress?:string;resolverChain?:Chain;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

