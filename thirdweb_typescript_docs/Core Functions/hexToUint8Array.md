# hexToUint8Array

*Source: [https://portal.thirdweb.com/references/typescript/v5/hexToUint8Array](https://portal.thirdweb.com/references/typescript/v5/hexToUint8Array)*

* References
* hexToUint8Array

Converts a hexadecimal string to a Uint8Array.

## Example

`import{ hexToUint8Array }from"thirdweb/utils";constbytes=hexToUint8Array("0x48656c6c6f2c20776f726c6421");console.log(bytes);// Uint8Array([72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33])`
#### Signature

`functionhexToUint8Array(hex:`0x${string}`,opts:Options,):Uint8Array;`
## Parameters

#### hex

The hexadecimal string to convert.

### Type

`lethex:`0x${string}`;`
#### opts

Options for the conversion.

### Type

`letopts:Options;`
## Returns

#### Return Type

`letreturnType:Uint8Array;`The Uint8Array representation of the hexadecimal string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

