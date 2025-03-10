# useCallsStatus

*Source: [https://portal.thirdweb.com/references/typescript/v5/eip5792/useCallsStatus](https://portal.thirdweb.com/references/typescript/v5/eip5792/useCallsStatus)*

* References
* useCallsStatus

A hook to get a call bundle's current status according toEIP-5792.

This function is dependent on the wallet's support for EIP-5792 and could throw an error if it's not supported.

## Example

`import{ useCallsStatus }from"thirdweb/react";const{data:status,isLoading}=useCallsStatus({bundleId,client,});`
#### Signature

`functionuseCallsStatus(options:{bundleId:string;client:ThirdwebClient;queryOptions?:{enabled?:boolean;retry?:number};}):UseQueryResult<GetCallsStatusResponse>;`
## Parameters

#### options

### Type

`letoptions:{bundleId:string;client:ThirdwebClient;queryOptions?:{enabled?:boolean;retry?:number};};`
## Returns

#### Return Type

`letreturnType:UseQueryResult<GetCallsStatusResponse>;`a React Query object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

