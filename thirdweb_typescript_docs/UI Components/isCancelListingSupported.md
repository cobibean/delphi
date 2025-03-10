# isCancelListingSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/isCancelListingSupported](https://portal.thirdweb.com/references/typescript/v5/marketplace/isCancelListingSupported)*

* References
* isCancelListingSupported

Checks if thecancelListingmethod is supported by the given contract.

`cancelListing`
## Example

`import{ isCancelListingSupported }from"thirdweb/extensions/marketplace";constsupported=isCancelListingSupported(["0x..."]);`
#### Signature

`functionisCancelListingSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thecancelListingmethod is supported.

`cancelListing`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

