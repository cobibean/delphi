# isBurnSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/isBurnSupported](https://portal.thirdweb.com/references/typescript/v5/erc721/isBurnSupported)*

* References
* isBurnSupported

Checks if theburnmethod is supported by the given contract.

`burn`
## Example

`import{ isBurnSupported }from"thirdweb/extensions/erc721";constsupported=isBurnSupported(["0x..."]);`
#### Signature

`functionisBurnSupported(availableSelectors:Array<string>):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if theburnmethod is supported.

`burn`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

