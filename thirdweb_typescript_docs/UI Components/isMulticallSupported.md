# isMulticallSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isMulticallSupported](https://portal.thirdweb.com/references/typescript/v5/common/isMulticallSupported)*

* References
* isMulticallSupported

Checks if themulticallmethod is supported by the given contract.

`multicall`
## Example

`import{ isMulticallSupported }from"thirdweb/extensions/common";constsupported=isMulticallSupported(["0x..."]);`
#### Signature

`functionisMulticallSupported(availableSelectors:Array<string>,):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if themulticallmethod is supported.

`multicall`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

