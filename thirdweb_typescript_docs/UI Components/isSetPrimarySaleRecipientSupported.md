# isSetPrimarySaleRecipientSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isSetPrimarySaleRecipientSupported](https://portal.thirdweb.com/references/typescript/v5/common/isSetPrimarySaleRecipientSupported)*

* References
* isSetPrimarySaleRecipientSupported

Checks if thesetPrimarySaleRecipientmethod is supported by the given contract.

`setPrimarySaleRecipient`
## Example

`import{ isSetPrimarySaleRecipientSupported }from"thirdweb/extensions/common";constsupported=isSetPrimarySaleRecipientSupported(["0x..."]);`
#### Signature

`functionisSetPrimarySaleRecipientSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thesetPrimarySaleRecipientmethod is supported.

`setPrimarySaleRecipient`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

