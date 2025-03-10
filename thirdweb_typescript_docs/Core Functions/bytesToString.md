# bytesToString

*Source: [https://portal.thirdweb.com/references/typescript/v5/bytesToString](https://portal.thirdweb.com/references/typescript/v5/bytesToString)*

* References
* bytesToString

Converts an array of bytes to a string using UTF-8 encoding.

## Example

`import{ bytesToString }from"thirdweb/utils";constbytes=newUint8Array([72,101,108,108,111]);conststring=bytesToString(bytes);console.log(string);// "Hello"`
#### Signature

`functionbytesToString(bytes_:Uint8Array,opts:Options):string;`
## Parameters

#### bytes_

The array of bytes to convert.

### Type

`letbytes_:Uint8Array;`
#### opts

Optional parameters for the conversion.

### Type

`letopts:Options;`
## Returns

#### Return Type

`letreturnType:string;`The resulting string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

