# isGetActiveClaimConditionIdSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/isGetActiveClaimConditionIdSupported](https://portal.thirdweb.com/references/typescript/v5/erc20/isGetActiveClaimConditionIdSupported)*

* References
* isGetActiveClaimConditionIdSupported

Checks if thegetActiveClaimConditionIdmethod is supported by the given contract.

`getActiveClaimConditionId`
## Example

`import{ isGetActiveClaimConditionIdSupported }from"thirdweb/extensions/erc20";constsupported=isGetActiveClaimConditionIdSupported(["0x..."]);`
#### Signature

`functionisGetActiveClaimConditionIdSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetActiveClaimConditionIdmethod is supported.

`getActiveClaimConditionId`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

