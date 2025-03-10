# fromBytes

*Source: [https://portal.thirdweb.com/references/typescript/v5/fromBytes](https://portal.thirdweb.com/references/typescript/v5/fromBytes)*

* References
* fromBytes

Converts a Uint8Array to the specified type.

## Example

`import{ fromBytes }from"thirdweb/utils";constbytes=newUint8Array([1,164]);constnumber=fromBytes(bytes,"number");console.log(number);// 420`
#### Signature

`functionfromBytes(bytes:Uint8Array,toOrOpts:FromBytesParameters<TTo>,):FromBytesReturnType<TTo>;`
## Parameters

#### bytes

The Uint8Array to convert.

### Type

`letbytes:Uint8Array;`
#### toOrOpts

The target type or conversion options.

### Type

`lettoOrOpts:FromBytesParameters<TTo>;`
## Returns

#### Return Type

`letreturnType:FromBytesReturnType<TTo>;`The converted value of the specified type.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

