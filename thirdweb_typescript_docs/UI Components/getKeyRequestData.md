# getKeyRequestData

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/getKeyRequestData](https://portal.thirdweb.com/references/typescript/v5/farcaster/getKeyRequestData)*

* References
* getKeyRequestData

Prepares the data required for signing a key request using EIP-712 typed data signing.
This includes the domain, types, primary type, and the message to be signed.

## Example

`constmessage={requestFid:123456789n,key:"0x04bfc...",deadline:1657758061n,};consteip712Data=getKeyRequestData(message);`
#### Signature

`functiongetKeyRequestData(message:SignedKeyRequestMessage):{domain:{readonlychainId:10;readonlyname:"Farcaster SignedKeyRequestValidator";readonlyverifyingContract:"0x00000000FC700472606ED4fA22623Acf62c60553";readonlyversion:"1";};message:SignedKeyRequestMessage;primaryType:"SignedKeyRequest";types:{readonlySignedKeyRequest:Array<{name:string;type:string}>;};};`
## Parameters

#### message

The message to be signed, containing the request FID, key, and deadline.

### Type

`letmessage:{deadline:bigint;key:Hex;requestFid:bigint};`
## Returns

#### Return Type

`letreturnType:{domain:{readonlychainId:10;readonlyname:"Farcaster SignedKeyRequestValidator";readonlyverifyingContract:"0x00000000FC700472606ED4fA22623Acf62c60553";readonlyversion:"1";};message:SignedKeyRequestMessage;primaryType:"SignedKeyRequest";types:{readonlySignedKeyRequest:Array<{name:string;type:string}>;};};`An object containing the domain, types, primary type, and the message for EIP-712 signing.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

