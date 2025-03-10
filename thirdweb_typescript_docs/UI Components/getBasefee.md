# getBasefee

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/getBasefee](https://portal.thirdweb.com/references/typescript/v5/multicall3/getBasefee)*

* References
* getBasefee

Calls the "getBasefee" function on the contract.

## Example

`import{ getBasefee }from"thirdweb/extensions/multicall3";constresult=awaitgetBasefee({contract,});`
#### Signature

`functiongetBasefee(options:BaseTransactionOptions):Promise<bigint>;`
## Parameters

#### options

The options for the getBasefee function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

