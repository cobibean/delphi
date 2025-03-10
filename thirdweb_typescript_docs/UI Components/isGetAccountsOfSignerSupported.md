# isGetAccountsOfSignerSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/isGetAccountsOfSignerSupported](https://portal.thirdweb.com/references/typescript/v5/erc4337/isGetAccountsOfSignerSupported)*

* References
* isGetAccountsOfSignerSupported

Checks if thegetAccountsOfSignermethod is supported by the given contract.

`getAccountsOfSigner`
## Example

`import{ isGetAccountsOfSignerSupported }from"thirdweb/extensions/erc4337";constsupported=isGetAccountsOfSignerSupported(["0x..."]);`
#### Signature

`functionisGetAccountsOfSignerSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetAccountsOfSignermethod is supported.

`getAccountsOfSigner`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

