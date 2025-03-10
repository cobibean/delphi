# isGetContractMetadataSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isGetContractMetadataSupported](https://portal.thirdweb.com/references/typescript/v5/common/isGetContractMetadataSupported)*

* References
* isGetContractMetadataSupported

Checks if thecontractURImethod is supported by the given contract.

`contractURI`
## Example

`import{ isContractURISupported }from"thirdweb/extensions/common";constsupported=isContractURISupported(["0x..."]);`
#### Signature

`functionisGetContractMetadataSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thecontractURImethod is supported.

`contractURI`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

