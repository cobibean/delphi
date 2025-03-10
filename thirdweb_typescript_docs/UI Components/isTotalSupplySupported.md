# isTotalSupplySupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/isTotalSupplySupported](https://portal.thirdweb.com/references/typescript/v5/erc721/isTotalSupplySupported)*

* References
* isTotalSupplySupported

Checks if thetotalSupplymethod is supported by the given contract.

`totalSupply`
## Example

`import{ isTotalSupplySupported }from"thirdweb/extensions/erc721";constsupported=isTotalSupplySupported(["0x..."]);`
#### Signature

`functionisTotalSupplySupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thetotalSupplymethod is supported.

`totalSupply`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

