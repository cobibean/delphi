# useEnsAvatar

*Source: [https://portal.thirdweb.com/references/typescript/v5/ens/useEnsAvatar](https://portal.thirdweb.com/references/typescript/v5/ens/useEnsAvatar)*

* References
* useEnsAvatar

Get the ENS avatar for an ENS name

## Example

`import{ useEnsAvatar }from"thirdweb/react";const{data:ensAvatar}=useEnsAvatar({client,ensName:"my-ens-name.eth",});`
#### Signature

`functionuseEnsAvatar(options:{client:ThirdwebClient;ensName:undefined|null|string;}):UseQueryResult<null|string,Error>;`
## Parameters

#### options

the client and ENS name to get the avatar for

### Type

`letoptions:{client:ThirdwebClient;ensName:undefined|null|string;};`
## Returns

#### Return Type

`letreturnType:UseQueryResult<null|string,Error>;`
* a query object that resolves to the avatar

a query object that resolves to the avatar

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

