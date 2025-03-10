# useCapabilities

*Source: [https://portal.thirdweb.com/references/typescript/v5/eip5792/useCapabilities](https://portal.thirdweb.com/references/typescript/v5/eip5792/useCapabilities)*

* References
* useCapabilities

A hook to get the current wallet's capabilities according toEIP-5792.

This function is dependent on the wallet's support for EIP-5792, but will not throw.The returned object contains amessagefield detailing any issues with the wallet's support for EIP-5792.

`message`
## Example

`import{ useCapabilities }from"thirdweb/react";const{data:capabilities,isLoading}=useCapabilities();`
#### Signature

`functionuseCapabilities(options?:{queryOptions?:{enabled?:boolean;retry?:number};}):UseQueryResult<{message?:string}>;`
## Parameters

#### options

### Type

`letoptions:{queryOptions?:{enabled?:boolean;retry?:number} };`
## Returns

#### Return Type

`letreturnType:UseQueryResult<{message?:string}>;`a React Query object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

