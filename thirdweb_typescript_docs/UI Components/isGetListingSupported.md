# isGetListingSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/isGetListingSupported](https://portal.thirdweb.com/references/typescript/v5/marketplace/isGetListingSupported)*

* References
* isGetListingSupported

Checks if theisGetListingSupportedmethod is supported by the given contract.

`isGetListingSupported`
## Example

`import{ isGetListingSupported }from"thirdweb/extensions/marketplace";constsupported=isGetListingSupported(["0x..."]);`
#### Signature

`functionisGetListingSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if theisGetListingSupportedmethod is supported.

`isGetListingSupported`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

