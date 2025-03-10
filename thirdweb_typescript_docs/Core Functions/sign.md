# sign

*Source: [https://portal.thirdweb.com/references/typescript/v5/sign](https://portal.thirdweb.com/references/typescript/v5/sign)*

* References
* sign

Generates the signature for the provided transaction hash.

## Example

`import{ sign }from"thirdweb/utils";constsignature=sign({hash:"0x",privateKey:"0x",});`
#### Signature

`functionsign(options:SignOptions):{r:`0x${string}`;s:`0x${string}`;v:bigint;yParity:number;};`
## Parameters

#### options

The options for signing.

### Type

`letoptions:{hash:Hex;privateKey:Hex};`
## Returns

#### Return Type

`letreturnType:{r:`0x${string}`;s:`0x${string}`;v:bigint;yParity:number;};`The transaction signature.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

