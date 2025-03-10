# isGetRoyaltyInfoForTokenSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isGetRoyaltyInfoForTokenSupported](https://portal.thirdweb.com/references/typescript/v5/common/isGetRoyaltyInfoForTokenSupported)*

* References
* isGetRoyaltyInfoForTokenSupported

Checks if thegetRoyaltyInfoForTokenmethod is supported by the given contract.

`getRoyaltyInfoForToken`
## Example

`import{ isGetRoyaltyInfoForTokenSupported }from"thirdweb/extensions/common";constsupported=isGetRoyaltyInfoForTokenSupported(["0x..."]);`
#### Signature

`functionisGetRoyaltyInfoForTokenSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetRoyaltyInfoForTokenmethod is supported.

`getRoyaltyInfoForToken`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

