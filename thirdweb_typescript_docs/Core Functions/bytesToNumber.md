# bytesToNumber

*Source: [https://portal.thirdweb.com/references/typescript/v5/bytesToNumber](https://portal.thirdweb.com/references/typescript/v5/bytesToNumber)*

* References
* bytesToNumber

Converts a Uint8Array of bytes to a number.

## Example

`import{ bytesToNumber }from"thirdweb/utils";constbytes=newUint8Array([1,164]);constnumber=bytesToNumber(bytes);console.log(number);// 420`
#### Signature

`functionbytesToNumber(bytes:Uint8Array,opts:BytesToBigIntOpts,):number;`
## Parameters

#### bytes

The Uint8Array of bytes to convert.

### Type

`letbytes:Uint8Array;`
#### opts

Optional configuration options.

### Type

`letopts:{signed?:boolean;size?:number};`
## Returns

#### Return Type

`letreturnType:number;`The converted number.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

