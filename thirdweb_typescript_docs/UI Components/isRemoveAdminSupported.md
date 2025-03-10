# isRemoveAdminSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/isRemoveAdminSupported](https://portal.thirdweb.com/references/typescript/v5/erc4337/isRemoveAdminSupported)*

* References
* isRemoveAdminSupported

Checks if theisRemoveAdminSupportedmethod is supported by the given contract.

`isRemoveAdminSupported`
## Example

`import{ isRemoveAdminSupported }from"thirdweb/extensions/erc4337";constsupported=isRemoveAdminSupported(["0x..."]);`
#### Signature

`functionisRemoveAdminSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if theisRemoveAdminSupportedmethod is supported.

`isRemoveAdminSupported`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

