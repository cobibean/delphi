# resolveAvatar

*Source: [https://portal.thirdweb.com/references/typescript/v5/ens/resolveAvatar](https://portal.thirdweb.com/references/typescript/v5/ens/resolveAvatar)*

* References
* resolveAvatar

Resolves an ENS name to the avatar URL.

## Example

`import{ resolveAvatar }from"thirdweb/extensions/ens";constaddress=awaitresolveAvatar({client,name:"vitalik.eth",});`
#### Signature

`functionresolveAvatar(options:ResolveAvatarOptions,):Promise<null|string>;`
## Parameters

#### options

The options for resolving an ENS address.

### Type

`letoptions:{client:ThirdwebClient;name:string;resolverAddress?:string;resolverChain?:Chain;};`
## Returns

#### Return Type

`letreturnType:Promise<null|string>;`A promise that resolves to the avatar url, or null if not set.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

