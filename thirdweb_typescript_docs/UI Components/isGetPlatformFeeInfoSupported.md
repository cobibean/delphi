# isGetPlatformFeeInfoSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isGetPlatformFeeInfoSupported](https://portal.thirdweb.com/references/typescript/v5/common/isGetPlatformFeeInfoSupported)*

* References
* isGetPlatformFeeInfoSupported

Checks if thegetPlatformFeeInfomethod is supported by the given contract.

`getPlatformFeeInfo`
## Example

`import{ isGetPlatformFeeInfoSupported }from"thirdweb/extensions/common";constsupported=isGetPlatformFeeInfoSupported(["0x..."]);`
#### Signature

`functionisGetPlatformFeeInfoSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetPlatformFeeInfomethod is supported.

`getPlatformFeeInfo`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

