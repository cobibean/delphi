# getSupportedCallbackFunctions

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/getSupportedCallbackFunctions](https://portal.thirdweb.com/references/typescript/v5/modules/getSupportedCallbackFunctions)*

* References
* getSupportedCallbackFunctions

Calls the "getSupportedCallbackFunctions" function on the contract.

## Example

`import{ getSupportedCallbackFunctions }from"thirdweb/extensions/modules";constresult=awaitgetSupportedCallbackFunctions({contract,});`
#### Signature

`functiongetSupportedCallbackFunctions(options:BaseTransactionOptions):Promise<readonlyArray<{mode:number;selector:`0x${string}`}>>`
## Parameters

#### options

The options for the getSupportedCallbackFunctions function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<readonlyArray<{mode:number;selector:`0x${string}`}>>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

