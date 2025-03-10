# hexToString

*Source: [https://portal.thirdweb.com/references/typescript/v5/hexToString](https://portal.thirdweb.com/references/typescript/v5/hexToString)*

* References
* hexToString

Converts a hexadecimal string to a UTF-8 string.

## Example

`import{ hexToString }from"thirdweb/utils";conststring=hexToString("0x48656c6c6f2c20776f726c6421");console.log(string);// "Hello, world!"`
#### Signature

`functionhexToString(hex:`0x${string}`,opts:Options):string;`
## Parameters

#### hex

The hexadecimal string to convert.

### Type

`lethex:`0x${string}`;`
#### opts

The options for the conversion.

### Type

`letopts:Options;`
## Returns

#### Return Type

`letreturnType:string;`The UTF-8 string representation of the hexadecimal string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

