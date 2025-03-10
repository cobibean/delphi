# toTokens

*Source: [https://portal.thirdweb.com/references/typescript/v5/toTokens](https://portal.thirdweb.com/references/typescript/v5/toTokens)*

* References
* toTokens

Converts a given number of units to a string representation with a specified number of decimal places.

## Example

`import{ toTokens }from"thirdweb/utils";toTokens(1000000000000000000n,18);// '1'`
#### Signature

`functiontoTokens(units:bigint,decimals:number):string;`
## Parameters

#### units

The number of units to convert.

### Type

`letunits:bigint;`
#### decimals

The number of decimal places to include in the string representation.

### Type

`letdecimals:number;`
## Returns

#### Return Type

`letreturnType:string;`The string representation of the converted units.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

