# verifyContractWalletSignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/verifyContractWalletSignature](https://portal.thirdweb.com/references/typescript/v5/verifyContractWalletSignature)*

* References
* verifyContractWalletSignature

## Example

`import{ verifyContractWalletSignature }from'thirdweb/auth';constisValid=awaitverifyContractWalletSignature({message:'0x..',signature:'0x..',address:'0x...',chain:...,client:...,});`
#### Signature

`functionverifyContractWalletSignature(__namedParameters:{accountFactory?:{address:string;verificationCalldata:`0x${string}`;};address:string;chain:Readonly;client:ThirdwebClient;message:Message;signature:string|Uint8Array<ArrayBufferLike>;}):Promise<boolean>;`
## Parameters

#### __namedParameters

### Type

`let__namedParameters:{accountFactory?:{address:string;verificationCalldata:`0x${string}`;};address:string;chain:Readonly;client:ThirdwebClient;message:Message;signature:string|Uint8Array<ArrayBufferLike>;};`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A boolean indicating whether the signature is valid.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

