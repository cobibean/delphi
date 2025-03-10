# isMintAdditionalSupplyToSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/isMintAdditionalSupplyToSupported](https://portal.thirdweb.com/references/typescript/v5/erc1155/isMintAdditionalSupplyToSupported)*

* References
* isMintAdditionalSupplyToSupported

Checks if themintAdditionalSupplyTomethod is supported by the given contract.

`mintAdditionalSupplyTo`
## Example

`import{ isMintAdditionalSupplyToSupported }from"thirdweb/extensions/erc1155";constsupported=isMintAdditionalSupplyToSupported(["0x..."]);`
#### Signature

`functionisMintAdditionalSupplyToSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if themintAdditionalSupplyTomethod is supported.

`mintAdditionalSupplyTo`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

