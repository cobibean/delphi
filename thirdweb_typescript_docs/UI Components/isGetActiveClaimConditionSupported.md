# isGetActiveClaimConditionSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/isGetActiveClaimConditionSupported](https://portal.thirdweb.com/references/typescript/v5/erc20/isGetActiveClaimConditionSupported)*

* References
* isGetActiveClaimConditionSupported

Checks if thegetActiveClaimConditionmethod is supported by the given contract.

`getActiveClaimCondition`
## Example

`import{ isGetActiveClaimConditionSupported }from"thirdweb/extensions/erc20";constsupported=isGetActiveClaimConditionSupported(["0x..."]);`
#### Signature

`functionisGetActiveClaimConditionSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetActiveClaimConditionmethod is supported.

`getActiveClaimCondition`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

