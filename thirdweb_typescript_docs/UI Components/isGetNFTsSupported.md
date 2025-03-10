# isGetNFTsSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/isGetNFTsSupported](https://portal.thirdweb.com/references/typescript/v5/erc721/isGetNFTsSupported)*

* References
* isGetNFTsSupported

Checks if thegetNFTsmethod is supported by the given contract.

`getNFTs`
## Example

`import{ isGetNFTsSupported }from"thirdweb/extensions/erc721";constsupported=isGetNFTsSupported(["0x..."]);`
#### Signature

`functionisGetNFTsSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thegetNFTsmethod is supported.

`getNFTs`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

