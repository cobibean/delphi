# isSharedMetadataSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/isSharedMetadataSupported](https://portal.thirdweb.com/references/typescript/v5/erc721/isSharedMetadataSupported)*

* References
* isSharedMetadataSupported

Checks if thesharedMetadatamethod is supported by the given contract.

`sharedMetadata`
## Example

`import{ isSharedMetadataSupported }from"thirdweb/extensions/erc721";constsupported=isSharedMetadataSupported(["0x..."]);`
#### Signature

`functionisSharedMetadataSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thesharedMetadatamethod is supported.

`sharedMetadata`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

