# keccak256

*Source: [https://portal.thirdweb.com/references/typescript/v5/keccak256](https://portal.thirdweb.com/references/typescript/v5/keccak256)*

* References
* keccak256

Calculates the Keccak-256 hash of the given value.

## Example

`import{ keccak256 }from"thirdweb/utils";consthash=keccak256("0x1234");`
#### Signature

`functionkeccak256(value:`0x${string}`|Uint8Array<ArrayBufferLike>,to?:TTo,):Keccak256Hash<TTo>;`
## Parameters

#### value

The value to hash, either as a hexadecimal string or a Uint8Array.

### Type

`letvalue:`0x${string}`|Uint8Array<ArrayBufferLike>;`
#### to

The desired output format of the hash (optional). Defaults to 'hex'.

### Type

`letto:TTo;`
## Returns

#### Return Type

`letreturnType:Keccak256Hash<TTo>;`The Keccak-256 hash of the value in the specified format.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

