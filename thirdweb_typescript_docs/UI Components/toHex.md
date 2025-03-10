# toHex

*Source: [https://portal.thirdweb.com/references/typescript/v5/toHex](https://portal.thirdweb.com/references/typescript/v5/toHex)*

* References
* toHex

Converts a value to its hexadecimal representation.

## Example

`import{ toHex }from"thirdweb/utils";consthex=toHex(420);console.log(hex);// "0x1a4"`
#### Signature

`functiontoHex(value:|string|number|bigint|boolean|Uint8Array<ArrayBufferLike>,opts:ToHexParameters,):`0x${string}`;`
## Parameters

#### value

The value to convert to hexadecimal.

### Type

`letvalue:|string|number|bigint|boolean|Uint8Array<ArrayBufferLike>;`
#### opts

Optional parameters for the conversion.

### Type

`letopts:{size?:number};`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`The hexadecimal representation of the value.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

