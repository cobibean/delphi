# isSetPlatformFeeInfoSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isSetPlatformFeeInfoSupported](https://portal.thirdweb.com/references/typescript/v5/common/isSetPlatformFeeInfoSupported)*

* References
* isSetPlatformFeeInfoSupported

Checks if thesetPlatformFeeInfomethod is supported by the given contract.

`setPlatformFeeInfo`
## Example

`import{ isSetPlatformFeeInfoSupported }from"thirdweb/extensions/common";constsupported=isSetPlatformFeeInfoSupported(["0x..."]);`
#### Signature

`functionisSetPlatformFeeInfoSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thesetPlatformFeeInfomethod is supported.

`setPlatformFeeInfo`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

