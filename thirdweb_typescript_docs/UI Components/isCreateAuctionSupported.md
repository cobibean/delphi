# isCreateAuctionSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/isCreateAuctionSupported](https://portal.thirdweb.com/references/typescript/v5/marketplace/isCreateAuctionSupported)*

* References
* isCreateAuctionSupported

Checks if thecreateAuctionmethod is supported by the given contract.

`createAuction`
## Example

`import{ isCreateAuctionSupported }from"thirdweb/extensions/marketplace";constsupported=isCreateAuctionSupported(["0x..."]);`
#### Signature

`functionisCreateAuctionSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thecreateAuctionmethod is supported.

`createAuction`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

