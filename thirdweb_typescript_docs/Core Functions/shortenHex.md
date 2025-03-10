# shortenHex

*Source: [https://portal.thirdweb.com/references/typescript/v5/shortenHex](https://portal.thirdweb.com/references/typescript/v5/shortenHex)*

* References
* shortenHex

Shortens a hexadecimal string without performing any validation or checksumming.

## Example

`import{ shortenHex }from"thirdweb/utils";shortenHex("0xa0cf798816d4b9b9866b5330eea46a18382f251e");//=> '0xa0cf...251e'`
#### Signature

`functionshortenHex(hex:string,length:number):string;`
## Parameters

#### hex

The hexadecimal string to shorten.

### Type

`lethex:string;`
#### length

The number of characters to keep from the start and end of the string.

### Type

`letlength:number;`
## Returns

#### Return Type

`letreturnType:string;`The shortened hexadecimal string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

