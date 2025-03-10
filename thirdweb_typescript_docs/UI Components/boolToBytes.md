# boolToBytes

*Source: [https://portal.thirdweb.com/references/typescript/v5/boolToBytes](https://portal.thirdweb.com/references/typescript/v5/boolToBytes)*

* References
* boolToBytes

Converts a boolean value to a Uint8Array of bytes.

## Example

`import{ boolToBytes }from"thirdweb/utils";constbytes=boolToBytes(true);console.log(bytes);// Uint8Array(1) [ 1 ]`
#### Signature

`functionboolToBytes(value:boolean,opts:Options,):Uint8Array<ArrayBufferLike>;`
## Parameters

#### value

The boolean value to convert.

### Type

`letvalue:boolean;`
#### opts

Optional parameters for the conversion.

### Type

`letopts:Options;`
## Returns

#### Return Type

`letreturnType:Uint8Array<ArrayBufferLike>;`The Uint8Array of bytes representing the boolean value.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

