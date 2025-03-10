# isGetAllRoleMembersSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/isGetAllRoleMembersSupported](https://portal.thirdweb.com/references/typescript/v5/permissions/isGetAllRoleMembersSupported)*

* References
* isGetAllRoleMembersSupported

Checks if thegetAllRoleMembersmethod is supported by the given contract.

`getAllRoleMembers`
## Example

`import{ isGetAllRoleMembersSupported }from"thirdweb/extensions/permissions";constsupported=isGetAllRoleMembersSupported(["0x..."]);`
#### Signature

`functionisGetAllRoleMembersSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetAllRoleMembersmethod is supported.

`getAllRoleMembers`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

