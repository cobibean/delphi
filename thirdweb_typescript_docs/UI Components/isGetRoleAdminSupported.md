# isGetRoleAdminSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/isGetRoleAdminSupported](https://portal.thirdweb.com/references/typescript/v5/permissions/isGetRoleAdminSupported)*

* References
* isGetRoleAdminSupported

Checks if thegetRoleAdminmethod is supported by the given contract.

`getRoleAdmin`
## Example

`import{ isGetRoleAdminSupported }from"thirdweb/extensions/permissions";constsupported=isGetRoleAdminSupported(["0x..."]);`
#### Signature

`functionisGetRoleAdminSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetRoleAdminmethod is supported.

`getRoleAdmin`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

