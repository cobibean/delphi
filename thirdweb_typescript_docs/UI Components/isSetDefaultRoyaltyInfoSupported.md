# isSetDefaultRoyaltyInfoSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isSetDefaultRoyaltyInfoSupported](https://portal.thirdweb.com/references/typescript/v5/common/isSetDefaultRoyaltyInfoSupported)*

* References
* isSetDefaultRoyaltyInfoSupported

Checks if thesetDefaultRoyaltyInfomethod is supported by the given contract.

`setDefaultRoyaltyInfo`
## Example

`import{ isSetDefaultRoyaltyInfoSupported }from"thirdweb/extensions/common";constsupported=isSetDefaultRoyaltyInfoSupported(["0x..."]);`
#### Signature

`functionisSetDefaultRoyaltyInfoSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thesetDefaultRoyaltyInfomethod is supported.

`setDefaultRoyaltyInfo`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

