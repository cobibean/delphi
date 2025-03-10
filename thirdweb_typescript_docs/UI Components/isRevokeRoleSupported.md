# isRevokeRoleSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/isRevokeRoleSupported](https://portal.thirdweb.com/references/typescript/v5/permissions/isRevokeRoleSupported)*

* References
* isRevokeRoleSupported

Checks if therevokeRolemethod is supported by the given contract.

`revokeRole`
## Example

`import{ isRevokeRoleSupported }from"thirdweb/extensions/permissions";constsupported=isRevokeRoleSupported(["0x..."]);`
#### Signature

`functionisRevokeRoleSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if therevokeRolemethod is supported.

`revokeRole`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

