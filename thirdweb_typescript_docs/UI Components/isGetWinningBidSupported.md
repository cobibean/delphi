# isGetWinningBidSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/isGetWinningBidSupported](https://portal.thirdweb.com/references/typescript/v5/marketplace/isGetWinningBidSupported)*

* References
* isGetWinningBidSupported

Checks if thegetWinningBidmethod is supported by the given contract.

`getWinningBid`
## Example

`import{ isGetWinningBidSupported }from"thirdweb/extensions/marketplace";constsupported=isGetWinningBidSupported(["0x..."]);`
#### Signature

`functionisGetWinningBidSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetWinningBidmethod is supported.

`getWinningBid`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

