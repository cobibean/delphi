# createContractQuery

*Source: [https://portal.thirdweb.com/references/typescript/v5/createContractQuery](https://portal.thirdweb.com/references/typescript/v5/createContractQuery)*

* References
* createContractQuery

Creates auseQueryhook for a contract call.

`useQuery`
## Example

`import{ createContractQuery }from"thirdweb/react";import{ totalSupply }from"thirdweb/extensions/erc20";constuseTotalSupply=createContractQuery(totalSupply);const{data,isLoading}=useTotalSupply({ contract });`
#### Signature

`functioncreateContractQuery(readCall:(options:BaseTransactionOptions<opts,abi>,)=>Promise<result>,):(options:{contract:Readonly<ContractOptions<abi,`0x${string}`>>;}&opts&{queryOptions?:Partial<{enabled:boolean}> },)=>UseQueryResult<result,Error>;`
## Parameters

#### readCall

A function that performs the contract function call and returns the result.

### Type

`letreadCall:(options:BaseTransactionOptions<opts,abi>,)=>Promise<result>;`
## Returns

#### Return Type

`letreturnType:(options:{contract:Readonly<ContractOptions<abi,`0x${string}`>>;}&opts&{queryOptions?:Partial<{enabled:boolean}> },)=>UseQueryResult<result,Error>;`An object containing the createduseReadhook.

`useRead`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

