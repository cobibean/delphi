# isGetSupportedCallbackFunctionsSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/isGetSupportedCallbackFunctionsSupported](https://portal.thirdweb.com/references/typescript/v5/modules/isGetSupportedCallbackFunctionsSupported)*

* References
* isGetSupportedCallbackFunctionsSupported

Checks if thegetSupportedCallbackFunctionsmethod is supported by the given contract.

`getSupportedCallbackFunctions`
## Example

`import{ isGetSupportedCallbackFunctionsSupported }from"thirdweb/extensions/modules";constsupported=isGetSupportedCallbackFunctionsSupported(["0x..."]);`
#### Signature

`functionisGetSupportedCallbackFunctionsSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetSupportedCallbackFunctionsmethod is supported.

`getSupportedCallbackFunctions`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

