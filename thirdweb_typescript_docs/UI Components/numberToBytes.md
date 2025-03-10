# numberToBytes

*Source: [https://portal.thirdweb.com/references/typescript/v5/numberToBytes](https://portal.thirdweb.com/references/typescript/v5/numberToBytes)*

* References
* numberToBytes

Converts a number to bytes.

## Example

`import{ numberToBytes }from"thirdweb/utils";constbytes=numberToBytes(420);console.log(bytes);// Uint8Array(2) [ 1, 164 ]`
#### Signature

`functionnumberToBytes(value:number|bigint,opts?:Options,):Uint8Array<ArrayBufferLike>;`
## Parameters

#### value

The number to convert.

### Type

`letvalue:number|bigint;`
#### opts

Options for converting the number to hex.

### Type

`letopts:Options;`
## Returns

#### Return Type

`letreturnType:Uint8Array<ArrayBufferLike>;`The bytes representation of the number.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

