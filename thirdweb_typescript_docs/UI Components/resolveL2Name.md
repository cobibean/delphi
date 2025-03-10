# resolveL2Name

*Source: [https://portal.thirdweb.com/references/typescript/v5/ens/resolveL2Name](https://portal.thirdweb.com/references/typescript/v5/ens/resolveL2Name)*

* References
* resolveL2Name

Resolves the L2 name for a specified address.

## Example

`import{ resolveL2Name }from"thirdweb/extensions/ens";constname=awaitresolveL2Name({client,address:"0x1234...",resolverAddress:"0x...",resolverChain: base,});`Resolve a Basename.

`import{resolveL2Name,BASENAME_RESOLVER_ADDRESS,}from"thirdweb/extensions/ens";import{ base }from"thirdweb/chains";constname=awaitresolveL2Name({client,address:"0x1234...",resolverAddress:BASENAME_RESOLVER_ADDRESS,resolverChain: base,});`
#### Signature

`functionresolveL2Name(options:ResolveL2NameOptions,):Promise<null|string>;`
## Parameters

#### options

The options for resolving an L2 ENS address.

### Type

`letoptions:{address:Address;client:ThirdwebClient;resolverAddress:string;resolverChain:Chain;};`
## Returns

#### Return Type

`letreturnType:Promise<null|string>;`A promise that resolves to the Ethereum address.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

