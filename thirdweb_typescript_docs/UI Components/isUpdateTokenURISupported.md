# isUpdateTokenURISupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/isUpdateTokenURISupported](https://portal.thirdweb.com/references/typescript/v5/erc721/isUpdateTokenURISupported)*

* References
* isUpdateTokenURISupported

Checks if thesetTokenURImethod is supported by the given contract.

`setTokenURI`
## Example

`import{ isSetTokenURISupported }from"thirdweb/extensions/erc721";constsupported=isSetTokenURISupported(["0x..."]);`
#### Signature

`functionisUpdateTokenURISupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thesetTokenURImethod is supported.

`setTokenURI`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

