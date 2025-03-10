# useEnsName

*Source: [https://portal.thirdweb.com/references/typescript/v5/ens/useEnsName](https://portal.thirdweb.com/references/typescript/v5/ens/useEnsName)*

* References
* useEnsName

Get the ENS name and avatar for an address

## Example

`import{ useEnsName }from"thirdweb/react";const{data:ensName}=useEnsName({client,address:"0x1234...",});`
#### Signature

`functionuseEnsName(options:{address:undefined|string;client:ThirdwebClient;}):UseQueryResult<null|string,Error>;`
## Parameters

#### options

the client and address to get the ENS name and avatar for

### Type

`letoptions:{address:undefined|string;client:ThirdwebClient};`
## Returns

#### Return Type

`letreturnType:UseQueryResult<null|string,Error>;`
* a query object that resolves to the ENS name

a query object that resolves to the ENS name

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

