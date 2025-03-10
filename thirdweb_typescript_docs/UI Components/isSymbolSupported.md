# isSymbolSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isSymbolSupported](https://portal.thirdweb.com/references/typescript/v5/common/isSymbolSupported)*

* References
* isSymbolSupported

Checks if thesymbolmethod is supported by the given contract.

`symbol`
## Example

`import{ isSymbolSupported }from"thirdweb/extensions/common";constsupported=isSymbolSupported(["0x..."]);`
#### Signature

`functionisSymbolSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thesymbolmethod is supported.

`symbol`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

