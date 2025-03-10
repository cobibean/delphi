# getSignedKeyRequestMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/getSignedKeyRequestMetadata](https://portal.thirdweb.com/references/typescript/v5/farcaster/getSignedKeyRequestMetadata)*

* References
* getSignedKeyRequestMetadata

Generates the signed key request metadata to add a signer to an account.
This function can either sign a new key request using an account object or use an existing key request signature.
It prepares the metadata necessary for transactions involving signed key requests.

## Example

`import{ getSignedKeyRequestMetadata }from"thirdweb/extensions/farcaster";// Using an existing signatureconstsignedMetadata=awaitgetSignedKeyRequestMetadata({keyRequestSignature:"0xabcd...",accountAddress:"0x123...",message: {requestFid:123456789n,deadline:1657758061n,},});// Signing a new key requestconstsignedMetadata=awaitgetSignedKeyRequestMetadata({account,message: {requestFid:123456789n,deadline:1657758061n,},});`
#### Signature

`functiongetSignedKeyRequestMetadata(options:SignedKeyRequestMetadataOptions,):Promise<`0x${string}`>;`
## Parameters

#### options

The options for signing the key request or using an existing signature.

### Type

`letoptions:Prettify<{message:SignedKeyRequestMessage}&(|{account:Account}|{accountAddress:Address;keyRequestSignature:Hex})>;`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`A promise that resolves to the hexadecimal string of the encoded ABI parameters.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

