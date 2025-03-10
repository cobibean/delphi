# isContractTypeSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/thirdweb/isContractTypeSupported](https://portal.thirdweb.com/references/typescript/v5/thirdweb/isContractTypeSupported)*

* References
* isContractTypeSupported

Checks if thecontractTypemethod is supported by the given contract.

`contractType`
## Example

`import{ isContractTypeSupported }from"thirdweb/extensions/thirdweb";constsupported=isContractTypeSupported(["0x..."]);`
#### Signature

`functionisContractTypeSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thecontractTypemethod is supported.

`contractType`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

