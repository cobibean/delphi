# shortenAddress

*Source: [https://portal.thirdweb.com/references/typescript/v5/shortenAddress](https://portal.thirdweb.com/references/typescript/v5/shortenAddress)*

* References
* shortenAddress

Checksums and formats an address if valid. Note this function does not check if the provided address is an ENS.

## Example

`import{ shortenAddress }from"thirdweb/utils";shortenAddress("0xa0cf798816d4b9b9866b5330eea46a18382f251e");//=> '0xA0Cf...251e'`
#### Signature

`functionshortenAddress(address:string,length:number):string;`
## Parameters

#### address

The address to shorten.

### Type

`letaddress:string;`
#### length

The number of characters to keep from the start and end of the address.

### Type

`letlength:number;`
## Returns

#### Return Type

`letreturnType:string;`The shortened address.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

