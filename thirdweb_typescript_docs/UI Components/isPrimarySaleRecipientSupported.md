# isPrimarySaleRecipientSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isPrimarySaleRecipientSupported](https://portal.thirdweb.com/references/typescript/v5/common/isPrimarySaleRecipientSupported)*

* References
* isPrimarySaleRecipientSupported

Checks if theprimarySaleRecipientmethod is supported by the given contract.

`primarySaleRecipient`
## Example

`import{ isPrimarySaleRecipientSupported }from"thirdweb/extensions/common";constsupported=isPrimarySaleRecipientSupported(["0x..."]);`
#### Signature

`functionisPrimarySaleRecipientSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if theprimarySaleRecipientmethod is supported.

`primarySaleRecipient`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

