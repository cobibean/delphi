# isGetClaimConditionsSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/isGetClaimConditionsSupported-2](https://portal.thirdweb.com/references/typescript/v5/erc721/isGetClaimConditionsSupported-2)*

* References
* isGetClaimConditionsSupported

Checks if thegetClaimConditionsmethod is supported by the given contract.

`getClaimConditions`
## Example

`import{ isGetClaimConditionsSupported }from"thirdweb/extensions/erc721";constsupported=isGetClaimConditionsSupported(["0x..."]);`
#### Signature

`functionisGetClaimConditionsSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetClaimConditionsmethod is supported.

`getClaimConditions`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

