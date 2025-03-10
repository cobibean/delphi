# isGetInstalledModulesSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/isGetInstalledModulesSupported](https://portal.thirdweb.com/references/typescript/v5/modules/isGetInstalledModulesSupported)*

* References
* isGetInstalledModulesSupported

Checks if thegetInstalledModulesmethod is supported by the given contract.

`getInstalledModules`
## Example

`import{ isGetInstalledModulesSupported }from"thirdweb/extensions/modules";constsupported=isGetInstalledModulesSupported(["0x..."]);`
#### Signature

`functionisGetInstalledModulesSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetInstalledModulesmethod is supported.

`getInstalledModules`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

