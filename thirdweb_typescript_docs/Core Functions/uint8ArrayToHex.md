# uint8ArrayToHex

*Source: [https://portal.thirdweb.com/references/typescript/v5/uint8ArrayToHex](https://portal.thirdweb.com/references/typescript/v5/uint8ArrayToHex)*

* References
* uint8ArrayToHex

Converts an array of bytes to a hexadecimal string.

## Example

`import{ uint8arrayToHex }from"thirdweb/utils";consthex=uint8arrayToHex(newUint8Array([72,101,108,108,111,44,32,119,111,114,108,100,]),);console.log(hex);// "0x48656c6c6f2c20776f726c64"`
#### Signature

`functionuint8ArrayToHex(value:Uint8Array,opts:Options,):`0x${string}`;`
## Parameters

#### value

The array of bytes to convert.

### Type

`letvalue:Uint8Array;`
#### opts

Optional parameters for the conversion.

### Type

`letopts:Options;`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`The hexadecimal string representation of the bytes.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

