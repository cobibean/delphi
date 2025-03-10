# isCreateListingSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/isCreateListingSupported](https://portal.thirdweb.com/references/typescript/v5/marketplace/isCreateListingSupported)*

* References
* isCreateListingSupported

Checks if thecreateListingmethod is supported by the given contract.

`createListing`
## Example

`import{ isCreateAuctionSupported }from"thirdweb/extensions/marketplace";constsupported=isCreateAuctionSupported(["0x..."]);`
#### Signature

`functionisCreateListingSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thecreateListingmethod is supported.

`createListing`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

