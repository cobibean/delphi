# isHasRoleSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/isHasRoleSupported](https://portal.thirdweb.com/references/typescript/v5/permissions/isHasRoleSupported)*

* References
* isHasRoleSupported

Checks if thehasRolemethod is supported by the given contract.

`hasRole`
## Example

`import{ isHasRoleSupported }from"thirdweb/extensions/permissions";constsupported=isHasRoleSupported(["0x..."]);`
#### Signature

`functionisHasRoleSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thehasRolemethod is supported.

`hasRole`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

