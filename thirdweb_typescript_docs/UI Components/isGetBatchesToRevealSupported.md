# isGetBatchesToRevealSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/isGetBatchesToRevealSupported](https://portal.thirdweb.com/references/typescript/v5/erc721/isGetBatchesToRevealSupported)*

* References
* isGetBatchesToRevealSupported

Checks if thegetBatchesToRevealmethod is supported by the given contract.

`getBatchesToReveal`
## Example

`import{ isGetBatchesToRevealSupported }from"thirdweb/extensions/erc721";constsupported=isGetBatchesToRevealSupported(["0x..."]);`
#### Signature

`functionisGetBatchesToRevealSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetBatchesToRevealmethod is supported.

`getBatchesToReveal`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

