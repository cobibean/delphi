# isGetRoleMemberSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/isGetRoleMemberSupported](https://portal.thirdweb.com/references/typescript/v5/permissions/isGetRoleMemberSupported)*

* References
* isGetRoleMemberSupported

Checks if thegetRoleMembermethod is supported by the given contract.

`getRoleMember`
## Example

`import{ isGetRoleMemberSupported }from"thirdweb/extensions/permissions";constsupported=isGetRoleMemberSupported(["0x..."]);`
#### Signature

`functionisGetRoleMemberSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetRoleMembermethod is supported.

`getRoleMember`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

