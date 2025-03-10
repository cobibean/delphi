# isGetAuctionSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/isGetAuctionSupported](https://portal.thirdweb.com/references/typescript/v5/marketplace/isGetAuctionSupported)*

* References
* isGetAuctionSupported

Checks if thegetAuctionmethod is supported by the given contract.

`getAuction`
## Example

`import{ isGetAuctionSupported }from"thirdweb/extensions/marketplace";constsupported=isGetAuctionSupported(["0x..."]);`
#### Signature

`functionisGetAuctionSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetAuctionmethod is supported.

`getAuction`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

