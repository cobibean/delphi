# isInstallModuleSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/isInstallModuleSupported](https://portal.thirdweb.com/references/typescript/v5/modules/isInstallModuleSupported)*

* References
* isInstallModuleSupported

Checks if theinstallModulemethod is supported by the given contract.

`installModule`
## Example

`import{ isInstallModuleSupported }from"thirdweb/extensions/modules";constsupported=isInstallModuleSupported(["0x..."]);`
#### Signature

`functionisInstallModuleSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if theinstallModulemethod is supported.

`installModule`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

