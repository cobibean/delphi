# isGetDefaultRoyaltyInfoSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isGetDefaultRoyaltyInfoSupported](https://portal.thirdweb.com/references/typescript/v5/common/isGetDefaultRoyaltyInfoSupported)*

* References
* isGetDefaultRoyaltyInfoSupported

Checks if thegetDefaultRoyaltyInfomethod is supported by the given contract.

`getDefaultRoyaltyInfo`
## Example

`import{ isGetDefaultRoyaltyInfoSupported }from"thirdweb/extensions/common";constsupported=isGetDefaultRoyaltyInfoSupported(["0x..."]);`
#### Signature

`functionisGetDefaultRoyaltyInfoSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetDefaultRoyaltyInfomethod is supported.

`getDefaultRoyaltyInfo`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

