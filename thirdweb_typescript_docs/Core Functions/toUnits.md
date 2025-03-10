# toUnits

*Source: [https://portal.thirdweb.com/references/typescript/v5/toUnits](https://portal.thirdweb.com/references/typescript/v5/toUnits)*

* References
* toUnits

Converts a string representation of a number with decimal places to a BigInt representation.

## Example

`import{ toUnits }from"thirdweb/utils";toUnits("1",18);// 1000000000000000000n`
#### Signature

`functiontoUnits(tokens:string,decimals:number):bigint;`
## Parameters

#### tokens

The string representation of the number, including the integer and fraction parts.

### Type

`lettokens:string;`
#### decimals

The number of decimal places to include in the BigInt representation.

### Type

`letdecimals:number;`
## Returns

#### Return Type

`letreturnType:bigint;`The BigInt representation of the number.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

