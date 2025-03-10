# isNameSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isNameSupported](https://portal.thirdweb.com/references/typescript/v5/common/isNameSupported)*

* References
* isNameSupported

Checks if thenamemethod is supported by the given contract.

`name`
## Example

`import{ isNameSupported }from"thirdweb/extensions/common";constsupported=isNameSupported(["0x..."]);`
#### Signature

`functionisNameSupported(availableSelectors:Array<string>):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if thenamemethod is supported.

`name`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

