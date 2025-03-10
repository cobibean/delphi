# hexToBigInt

*Source: [https://portal.thirdweb.com/references/typescript/v5/hexToBigInt](https://portal.thirdweb.com/references/typescript/v5/hexToBigInt)*

* References
* hexToBigInt

Converts a hexadecimal string to a BigInt.

## Example

`import{ hexToBigInt }from"thirdweb/utils";constbigInt=hexToBigInt("0x1a4");console.log(bigInt);// 420n`
#### Signature

`functionhexToBigInt(hex:`0x${string}`,opts:Options):bigint;`
## Parameters

#### hex

The hexadecimal string to convert.

### Type

`lethex:`0x${string}`;`
#### opts

Optional parameters for the conversion.

### Type

`letopts:Options;`
## Returns

#### Return Type

`letreturnType:bigint;`The BigInt representation of the hexadecimal string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

