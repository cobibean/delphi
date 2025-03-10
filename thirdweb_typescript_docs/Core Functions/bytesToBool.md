# bytesToBool

*Source: [https://portal.thirdweb.com/references/typescript/v5/bytesToBool](https://portal.thirdweb.com/references/typescript/v5/bytesToBool)*

* References
* bytesToBool

Converts a byte array to a boolean value.

## Example

`import{ bytesToBool }from"thirdweb/utils";constbytes=newUint8Array([1]);constbool=bytesToBool(bytes);console.log(bool);// true`
#### Signature

`functionbytesToBool(bytes_:Uint8Array,opts:Options):boolean;`
## Parameters

#### bytes_

The byte array to convert.

### Type

`letbytes_:Uint8Array;`
#### opts

Optional parameters for the conversion.

### Type

`letopts:Options;`
## Returns

#### Return Type

`letreturnType:boolean;`The boolean value converted from the byte array.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

