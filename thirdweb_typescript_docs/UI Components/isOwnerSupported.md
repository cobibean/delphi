# isOwnerSupported

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/isOwnerSupported](https://portal.thirdweb.com/references/typescript/v5/common/isOwnerSupported)*

* References
* isOwnerSupported

Checks if theownermethod is supported by the given contract.

`owner`
## Example

`import{ isOwnerSupported }from"thirdweb/extensions/common";constsupported=isOwnerSupported(["0x..."]);`
#### Signature

`functionisOwnerSupported(availableSelectors:Array<string>):boolean;`
## Parameters

#### availableSelectors

An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating if theownermethod is supported.

`owner`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

