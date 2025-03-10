# isUninstallModuleSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/isUninstallModuleSupported](https://portal.thirdweb.com/references/typescript/v5/modules/isUninstallModuleSupported)*

* References
* isUninstallModuleSupported

Checks if theuninstallModulemethod is supported by the given contract.

`uninstallModule`
## Example

`import{ isUninstallModuleSupported }from"thirdweb/extensions/modules";constsupported=isUninstallModuleSupported(["0x..."]);`
#### Signature

`functionisUninstallModuleSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if theuninstallModulemethod is supported.

`uninstallModule`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

