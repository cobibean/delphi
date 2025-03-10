# isResetClaimEligibilitySupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/isResetClaimEligibilitySupported](https://portal.thirdweb.com/references/typescript/v5/erc20/isResetClaimEligibilitySupported)*

* References
* isResetClaimEligibilitySupported

Checks if theresetClaimEligibilitymethod is supported by the given contract.

`resetClaimEligibility`
## Example

`import{ isResetClaimEligibilitySupported }from"thirdweb/extensions/erc20";constsupported=isResetClaimEligibilitySupported(["0x..."]);`
#### Signature

`functionisResetClaimEligibilitySupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if theresetClaimEligibilitymethod is supported.

`resetClaimEligibility`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

