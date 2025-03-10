# fromHex

*Source: [https://portal.thirdweb.com/references/typescript/v5/fromHex](https://portal.thirdweb.com/references/typescript/v5/fromHex)*

* References
* fromHex

Converts a hexadecimal string to the specified type.

## Example

`import{ fromHex }from"thirdweb/utils";conststring=fromHex("0x48656c6c6f2c20776f726c6421","string");console.log(string);// "Hello, world!"`
#### Signature

`functionfromHex(hex:`0x${string}`,toOrOpts:FromHexParameters<TTo>,):FromHexReturnType<TTo>;`
## Parameters

#### hex

The hexadecimal string to convert.

### Type

`lethex:`0x${string}`;`
#### toOrOpts

The target type or conversion options.

### Type

`lettoOrOpts:FromHexParameters<TTo>;`
## Returns

#### Return Type

`letreturnType:FromHexReturnType<TTo>;`The converted value of the specified type.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

