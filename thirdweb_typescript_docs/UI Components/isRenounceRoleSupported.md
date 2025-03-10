# isRenounceRoleSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/isRenounceRoleSupported](https://portal.thirdweb.com/references/typescript/v5/permissions/isRenounceRoleSupported)*

* References
* isRenounceRoleSupported

Checks if therenounceRolemethod is supported by the given contract.

`renounceRole`
## Example

`import{ isRenounceRoleSupported }from"thirdweb/extensions/permissions";constsupported=isRenounceRoleSupported(["0x..."]);`
#### Signature

`functionisRenounceRoleSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if therenounceRolemethod is supported.

`renounceRole`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

