# padHex

*Source: [https://portal.thirdweb.com/references/typescript/v5/padHex](https://portal.thirdweb.com/references/typescript/v5/padHex)*

* References
* padHex

Pads a hexadecimal string with zeros to a specified size.

## Example

`import{ padHex }from"thirdweb/utils";constpaddedHex=padHex("0x1a4", { size:32});console.log(paddedHex);// "0x000000000000000000000000000001a4"`
#### Signature

`functionpadHex(hex_:`0x${string}`,options:PadOptions,):`0x${string}`;`
## Parameters

#### hex_

The hexadecimal string to pad.

### Type

`lethex_:`0x${string}`;`
#### options

The padding options.

### Type

`letoptions:PadOptions;`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`The padded hexadecimal string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

