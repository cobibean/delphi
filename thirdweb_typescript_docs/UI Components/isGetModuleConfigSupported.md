# isGetModuleConfigSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/isGetModuleConfigSupported](https://portal.thirdweb.com/references/typescript/v5/modules/isGetModuleConfigSupported)*

* References
* isGetModuleConfigSupported

Checks if thegetModuleConfigmethod is supported by the given contract.

`getModuleConfig`
## Example

`import{ isGetModuleConfigSupported }from"thirdweb/extensions/modules";constsupported=isGetModuleConfigSupported(["0x..."]);`
#### Signature

`functionisGetModuleConfigSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetModuleConfigmethod is supported.

`getModuleConfig`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

