# resolveSignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/resolveSignature](https://portal.thirdweb.com/references/typescript/v5/resolveSignature)*

* References
* resolveSignature

Resolves a signature by converting a hexadecimal string into a function or event signature.

## Example

`import{ resolveSignature }from"thirdweb/utils";constres=awaitresolveSignature("0x1f931c1c");console.log(res);`
#### Signature

`functionresolveSignature(hexSig:string,):Promise<{event:null|`event ${string}`;function:null|`function ${string}`;}>;`
## Parameters

#### hexSig

The hexadecimal signature to resolve.

### Type

`lethexSig:string;`
## Returns

#### Return Type

`letreturnType:Promise<{event:null|`event ${string}`;function:null|`function ${string}`;}>;`A promise that resolves to an object containing the function and event signatures.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

