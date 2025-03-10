# isSetRoyaltyInfoForTokenSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isSetRoyaltyInfoForTokenSupported](https://portal.thirdweb.com/references/typescript/v5/common/isSetRoyaltyInfoForTokenSupported)*

* References
* isSetRoyaltyInfoForTokenSupported

Checks if thesetRoyaltyInfoForTokenmethod is supported by the given contract.

`setRoyaltyInfoForToken`
## Example

`import{ isSetRoyaltyInfoForTokenSupported }from"thirdweb/extensions/common";constsupported=isSetRoyaltyInfoForTokenSupported(["0x..."]);`
#### Signature

`functionisSetRoyaltyInfoForTokenSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thesetRoyaltyInfoForTokenmethod is supported.

`setRoyaltyInfoForToken`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

