# stringToBytes

*Source: [https://portal.thirdweb.com/references/typescript/v5/stringToBytes](https://portal.thirdweb.com/references/typescript/v5/stringToBytes)*

* References
* stringToBytes

Converts a string to an array of bytes.

## Example

`import{ stringToBytes }from"thirdweb/utils";constbytes=stringToBytes("Hello, world!");console.log(bytes);// Uint8Array(13) [ 72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33 ]`
#### Signature

`functionstringToBytes(value:string,opts:StringToBytesOpts,):Uint8Array;`
## Parameters

#### value

The string to convert.

### Type

`letvalue:string;`
#### opts

Optional parameters for the conversion.

### Type

`letopts:{size?:number};`
## Returns

#### Return Type

`letreturnType:Uint8Array;`The array of bytes representing the string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

