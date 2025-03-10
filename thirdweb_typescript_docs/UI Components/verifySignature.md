# verifySignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/verifySignature](https://portal.thirdweb.com/references/typescript/v5/verifySignature)*

* References
* verifySignature

Verifies the signature based on the provided options.
Handles smart contract wallet signatures and EOA signatures.IMPORTANT: in order to check smart contract signatures, a chain and client must be provided. Or, you can use theverifyContractWalletSignaturefunction directly if all signatures will be from smart accounts.

`verifyContractWalletSignature`verifyContractWalletSignature

## Example

`import{ verifySignature }from"thirdweb/auth";constisValid=awaitverifySignature({message:"Your message to sign",signature:"0x91db0222ec371a8c18d3b187a6d2e77789bffca1b96826ef6b8708e0d4a66c80312fc3ae95b8fbc147265abf539bb6f360152be61a0e1411d7f5771a599e769a1c",address:"0xda9C7A86AeE76701FC1c23ae548e8E93Ba3e42A5",client: thirdwebClient,chain: chain,});`
#### Signature

`functionverifySignature(options:{accountFactory?:{address:string;verificationCalldata:`0x${string}`;};address:string;chain?:Readonly<ChainOptions&{rpc:string}>;client?:ThirdwebClient;message:Message&(Message|undefined);signature:(string|Uint8Array<ArrayBufferLike>)&(undefined|string|Uint8Array<ArrayBufferLike>);}):Promise<boolean>;`
## Parameters

#### options

The options for signature verification.

### Type

`letoptions:{accountFactory?:{address:string;verificationCalldata:`0x${string}`;};address:string;chain?:Readonly<ChainOptions&{rpc:string}>;client?:ThirdwebClient;message:Message&(Message|undefined);signature:(string|Uint8Array<ArrayBufferLike>)&(undefined|string|Uint8Array<ArrayBufferLike>);};`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A boolean indicating whether the signature is valid or not.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

