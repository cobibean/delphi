# isBidInAuctionSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/isBidInAuctionSupported](https://portal.thirdweb.com/references/typescript/v5/marketplace/isBidInAuctionSupported)*

* References
* isBidInAuctionSupported

Checks if thebidInAuctionmethod is supported by the given contract.

`bidInAuction`
## Example

`import{ isBidInAuctionSupported }from"thirdweb/extensions/marketplace";constsupported=isBidInAuctionSupported(["0x..."]);`
#### Signature

`functionisBidInAuctionSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thebidInAuctionmethod is supported.

`bidInAuction`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

