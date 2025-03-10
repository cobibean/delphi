# getModuleTypes

*Source: [https://portal.thirdweb.com/references/typescript/v5/lens/getModuleTypes](https://portal.thirdweb.com/references/typescript/v5/lens/getModuleTypes)*

* References
* getModuleTypes

Calls the "getModuleTypes" function on the contract.

## Example

`import{ getModuleTypes }from"thirdweb/extensions/lens";constresult=awaitgetModuleTypes({contract,moduleAddress:...,});`
#### Signature

`functiongetModuleTypes(options:BaseTransactionOptions<GetModuleTypesParams>,):Promise<bigint>;`
## Parameters

#### options

The options for the getModuleTypes function.

### Type

`letoptions:BaseTransactionOptions<GetModuleTypesParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

