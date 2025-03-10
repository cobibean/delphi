# verifyFidSignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/verifyFidSignature](https://portal.thirdweb.com/references/typescript/v5/farcaster/verifyFidSignature)*

* References
* verifyFidSignature

Calls the "verifyFidSignature" function on the contract.

## Example

`import{ verifyFidSignature }from"thirdweb/extensions/farcaster";constresult=awaitverifyFidSignature({contract,custodyAddress:...,fid:...,digest:...,sig:...,});`
#### Signature

`functionverifyFidSignature(options:BaseTransactionOptions<VerifyFidSignatureParams>,):Promise<boolean>;`
## Parameters

#### options

The options for the verifyFidSignature function.

### Type

`letoptions:BaseTransactionOptions<VerifyFidSignatureParams>;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

