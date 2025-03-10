# toBytes

*Source: [https://portal.thirdweb.com/references/typescript/v5/toBytes](https://portal.thirdweb.com/references/typescript/v5/toBytes)*

* References
* toBytes

Converts a value to an array of bytes.

## Example

`import{ toBytes }from"thirdweb/utils";constbytes=toBytes("0x1a4");console.log(bytes);// Uint8Array(2) [ 1, 164 ]`
#### Signature

`functiontoBytes(value:string|number|bigint|boolean,opts:ToBytesParameters,):Uint8Array;`
## Parameters

#### value

The value to convert.

### Type

`letvalue:string|number|bigint|boolean;`
#### opts

Optional parameters for the conversion.

### Type

`letopts:{size?:number};`
## Returns

#### Return Type

`letreturnType:Uint8Array;`The array of bytes representing the value.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

