# resolveText

*Source: [https://portal.thirdweb.com/references/typescript/v5/ens/resolveText](https://portal.thirdweb.com/references/typescript/v5/ens/resolveText)*

* References
* resolveText

Resolves an ENS name and key to the specified record.

## Example

`import{ resolveText }from"thirdweb/extensions/ens";consttwitterUsername=awaitresolveText({client,name:"vitalik.eth",key:"com.twitter",});`
#### Signature

`functionresolveText(options:ResolveTextOptions,):Promise<null|string>;`
## Parameters

#### options

The options for resolving an ENS address.

### Type

`letoptions:{client:ThirdwebClient;key:string;name:string;resolverAddress?:string;resolverChain?:Chain;};`
## Returns

#### Return Type

`letreturnType:Promise<null|string>;`A promise that resolves to the text record.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

