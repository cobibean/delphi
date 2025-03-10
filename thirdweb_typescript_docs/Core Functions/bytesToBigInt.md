# bytesToBigInt

*Source: [https://portal.thirdweb.com/references/typescript/v5/bytesToBigInt](https://portal.thirdweb.com/references/typescript/v5/bytesToBigInt)*

* References
* bytesToBigInt

Converts a Uint8Array of bytes to a bigint.

## Example

`import{ bytesToBigInt }from"thirdweb/utils";constbytes=newUint8Array([1,164]);constbigInt=bytesToBigInt(bytes);console.log(bigInt);// 420n`
#### Signature

`functionbytesToBigInt(bytes:Uint8Array,opts:BytesToBigIntOpts,):bigint;`
## Parameters

#### bytes

The Uint8Array of bytes to convert.

### Type

`letbytes:Uint8Array;`
#### opts

Optional parameters for the conversion.

### Type

`letopts:{signed?:boolean;size?:number};`
## Returns

#### Return Type

`letreturnType:bigint;`The converted bigint.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

