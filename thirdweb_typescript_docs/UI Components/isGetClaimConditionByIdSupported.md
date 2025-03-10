# isGetClaimConditionByIdSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/isGetClaimConditionByIdSupported](https://portal.thirdweb.com/references/typescript/v5/erc20/isGetClaimConditionByIdSupported)*

* References
* isGetClaimConditionByIdSupported

Checks if thegetClaimConditionByIdmethod is supported by the given contract.

`getClaimConditionById`
## Example

`import{ isGetClaimConditionByIdSupported }from"thirdweb/extensions/erc20";constsupported=isGetClaimConditionByIdSupported(["0x..."]);`
#### Signature

`functionisGetClaimConditionByIdSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetClaimConditionByIdmethod is supported.

`getClaimConditionById`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

