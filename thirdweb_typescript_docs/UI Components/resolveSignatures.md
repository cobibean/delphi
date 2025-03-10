# resolveSignatures

*Source: [https://portal.thirdweb.com/references/typescript/v5/resolveSignatures](https://portal.thirdweb.com/references/typescript/v5/resolveSignatures)*

* References
* resolveSignatures

Resolves the signatures of the given hexadecimal signatures.

## Example

`import{ resolveSignatures }from"thirdweb/utils";constres=awaitresolveSignatures(["0x1f931c1c","0x1f931c1c"]);console.log(res);`
#### Signature

`functionresolveSignatures(hexSigs:Array<string>,):Promise<{events:Array<`event ${string}`>;functions:Array<`function ${string}`>;}>;`
## Parameters

#### hexSigs

An array of hexadecimal signatures.

### Type

`lethexSigs:Array<string>;`
## Returns

#### Return Type

`letreturnType:Promise<{events:Array<`event ${string}`>;functions:Array<`function ${string}`>;}>;`A promise that resolves to an object containing the resolved functions and events.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

