# isCreateAccountSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/isCreateAccountSupported](https://portal.thirdweb.com/references/typescript/v5/erc4337/isCreateAccountSupported)*

* References
* isCreateAccountSupported

Checks if thecreateAccountmethod is supported by the given contract.

`createAccount`
## Example

`import{ isCreateAccountSupported }from"thirdweb/extensions/erc4337";constsupported=isCreateAccountSupported(["0x..."]);`
#### Signature

`functionisCreateAccountSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thecreateAccountmethod is supported.

`createAccount`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

