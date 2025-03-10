# isGetRoleMemberCountSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/isGetRoleMemberCountSupported](https://portal.thirdweb.com/references/typescript/v5/permissions/isGetRoleMemberCountSupported)*

* References
* isGetRoleMemberCountSupported

Checks if thegetRoleMemberCountmethod is supported by the given contract.

`getRoleMemberCount`
## Example

`import{ isGetRoleMemberCountSupported }from"thirdweb/extensions/permissions";constsupported=isGetRoleMemberCountSupported(["0x..."]);`
#### Signature

`functionisGetRoleMemberCountSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetRoleMemberCountmethod is supported.

`getRoleMemberCount`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

