# hexToBytes

*Source: [https://portal.thirdweb.com/references/typescript/v5/hexToBytes](https://portal.thirdweb.com/references/typescript/v5/hexToBytes)*

* References
* hexToBytes

Converts a hexadecimal string to a Uint8Array of bytes.

## Example

`import{ hexToBytes }from"thirdweb/utils";constbytes=hexToBytes("0x1a4");console.log(bytes);// Uint8Array(2) [ 1, 164 ]`
#### Signature

`functionhexToBytes(hex_:`0x${string}`,opts:Options):Uint8Array;`
## Parameters

#### hex_

The hexadecimal string to convert.

### Type

`lethex_:`0x${string}`;`
#### opts

Options for converting the hexadecimal string.

### Type

`letopts:Options;`
## Returns

#### Return Type

`letreturnType:Uint8Array;`The Uint8Array of bytes.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

