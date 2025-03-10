# parseAbiParams

*Source: [https://portal.thirdweb.com/references/typescript/v5/parseAbiParams](https://portal.thirdweb.com/references/typescript/v5/parseAbiParams)*

* References
* parseAbiParams

Converts an array of parameter values to their respective types based on the provided type array.

This utility function is particularly useful for ensuring that parameter values are correctly formatted
according to the expected types before they are used in further processing or passed to a Solidity smart contract.

## Example

`import{ parseAbiParams }from"thirdweb/utils";constexample1=parseAbiParams(["address","uint256"],["0x.....","1200000"],);// result: ["0x......", 1200000n]constexample2=parseAbiParams(["address","bool"],["0x.....","true"],);// result: ["0x......", true]`
#### Signature

`functionparseAbiParams(constructorParamTypes:Array<string>,constructorParamValues:Array<unknown>,):Array<string|bigint|boolean>;`
## Parameters

#### constructorParamTypes

An array of type strings indicating the expected types of the values,
following Solidity type conventions (e.g., "address", "uint256", "bool").

### Type

`letconstructorParamTypes:Array<string>;`
#### constructorParamValues

An array of values to be converted according to the types.

### Type

`letconstructorParamValues:Array<unknown>;`
## Returns

#### Return Type

`letreturnType:Array<string|bigint|boolean>;`
* An array of values converted to their respective types.

An array of values converted to their respective types.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

