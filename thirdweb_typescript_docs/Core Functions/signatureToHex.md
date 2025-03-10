# signatureToHex

*Source: [https://portal.thirdweb.com/references/typescript/v5/signatureToHex](https://portal.thirdweb.com/references/typescript/v5/signatureToHex)*

* References
* signatureToHex

Converts a signature to a hex string.

## Example

`import{ signatureToHex }from"thirdweb/utils";consthex=signatureToHex({r:toHex(49782753348462494199823712700004552394425719014458918871452329774910450607807n,),s:toHex(33726695977844476214676913201140481102225469284307016937915595756355928419768n,),v:28n,});console.log(hex);// "0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db81c"`
#### Signature

`functionsignatureToHex(signature:{r:`0x${string}`;s:`0x${string}`;v?:number|bigint|`0x${string}`;yParity?:number|bigint|`0x${string}`;}):`0x${string}`;`
## Parameters

#### signature

The signature to convert.

### Type

`letsignature:{r:`0x${string}`;s:`0x${string}`;v?:number|bigint|`0x${string}`;yParity?:number|bigint|`0x${string}`;};`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`The hex string representation of the signature.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

