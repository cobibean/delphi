# verifyEOASignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/verifyEOASignature](https://portal.thirdweb.com/references/typescript/v5/verifyEOASignature)*

* References
* verifyEOASignature

Verifies the signature of a message using an Ethereum account's EOA (Externally Owned Account).

## Example

`import{ verifyEOASignature }from"thirdweb/auth";constisValid=awaitverifyEOASignature({message:"0x1234567890123456789012345678901234567890",signature:"0x1234567890123456789012345678901234567890",address:"0x1234567890123456789012345678901234567890",});`
#### Signature

`functionverifyEOASignature(options:VerifyEOASignatureParams,):Promise<boolean>;`
## Parameters

#### options

The options for verifying the signature.

### Type

`letoptions:{address:string;message:string|Message;signature:string|Uint8Array;};`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A boolean indicating whether the signature is valid.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

