# isIsAdminSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/isIsAdminSupported](https://portal.thirdweb.com/references/typescript/v5/erc4337/isIsAdminSupported)*

* References
* isIsAdminSupported

Checks if theisAdminmethod is supported by the given contract.

`isAdmin`
## Example

`import{ isIsAdminSupported }from"thirdweb/extensions/erc4337";constsupported=isIsAdminSupported(["0x..."]);`
#### Signature

`functionisIsAdminSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if theisAdminmethod is supported.

`isAdmin`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

