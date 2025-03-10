# encodeSignedKeyRequestMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/encodeSignedKeyRequestMetadata](https://portal.thirdweb.com/references/typescript/v5/farcaster/encodeSignedKeyRequestMetadata)*

* References
* encodeSignedKeyRequestMetadata

Encodes the signed key request metadata into a hexadecimal string.
This function takes in the request signer's address, the key request signature, the request Fid, and the deadline,
and returns the encoded ABI parameters as a hexadecimal string. It's used to prepare the metadata for transactions
involving signed key requests.

## Example

`constencodedMetadata=encodeSignedKeyRequestMetadata({requestSigner:"0x123...",keyRequestSignature:"0xabcd...",requestFid:123456789n,deadline:1657758061n,});`
#### Signature

`functionencodeSignedKeyRequestMetadata(options:{deadline:bigint;keyRequestSignature:`0x${string}`;requestFid:bigint;requestSigner:string;}):`0x${string}`;`
## Parameters

#### options

The options for encoding the signed key request metadata.

### Type

`letoptions:{deadline:bigint;keyRequestSignature:`0x${string}`;requestFid:bigint;requestSigner:string;};`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`The encoded ABI parameters as a hexadecimal string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

