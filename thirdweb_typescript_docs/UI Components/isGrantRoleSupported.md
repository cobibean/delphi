# isGrantRoleSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/isGrantRoleSupported](https://portal.thirdweb.com/references/typescript/v5/permissions/isGrantRoleSupported)*

* References
* isGrantRoleSupported

Checks if thegrantRolemethod is supported by the given contract.

`grantRole`
## Example

`import{ isGrantRoleSupported }from"thirdweb/extensions/permissions";constsupported=isGrantRoleSupported(["0x..."]);`
#### Signature

`functionisGrantRoleSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegrantRolemethod is supported.

`grantRole`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

