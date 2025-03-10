# isSetContractURISupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isSetContractURISupported](https://portal.thirdweb.com/references/typescript/v5/common/isSetContractURISupported)*

* References
* isSetContractURISupported

Checks if thesetContractURImethod is supported by the given contract.

`setContractURI`
## Example

`import{ isSetContractURISupported }from"thirdweb/extensions/common";constsupported=isSetContractURISupported(["0x..."]);`
#### Signature

`functionisSetContractURISupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thesetContractURImethod is supported.

`setContractURI`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

