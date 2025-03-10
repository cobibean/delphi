# checkContractWalletSignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1271/checkContractWalletSignature](https://portal.thirdweb.com/references/typescript/v5/erc1271/checkContractWalletSignature)*

* References
* checkContractWalletSignature

UseverifySignatureinstead

`verifySignature`Checks if a contract wallet signature is valid.

## Example

`import{ checkContractWalletSignature }from"thirdweb/extensions/erc1271";constisValid=awaitcheckContractWalletSignature({contract: myContract,message:"hello world",signature:"0x...",});`
#### Signature

`functioncheckContractWalletSignature(options:CheckContractWalletSignatureOptions,):Promise<boolean>;`
## Parameters

#### options

The options for the checkContractWalletSignature function.

### Type

`letoptions:{contract:ThirdwebContract;message:SignableMessage;signature:string;};`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A promise that resolves with a boolean indicating if the signature is valid.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

