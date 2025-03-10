# signKeyRequest

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/signKeyRequest](https://portal.thirdweb.com/references/typescript/v5/farcaster/signKeyRequest)*

* References
* signKeyRequest

Signs a key request message using EIP-712 typed data signing.
This function prepares the data for signing, signs it with the provided account, and returns the signature.

## Example

`constmessage={requestFid:123456789n,key:"0x04bfc...",deadline:1657758061n,};constsignature=signKeyRequest({ account: signerAccount, message });`
#### Signature

`functionsignKeyRequest(options:SignKeyRequestOptions,):Promise<`0x${string}`>;`
## Parameters

#### options

The options for signing the key request, including the account and the message.

### Type

`letoptions:{account:Account;message:SignedKeyRequestMessage};`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`A promise that resolves to the signature of the key request.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

