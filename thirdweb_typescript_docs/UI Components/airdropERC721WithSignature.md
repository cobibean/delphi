# airdropERC721WithSignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC721WithSignature](https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC721WithSignature)*

* References
* airdropERC721WithSignature

Prepares a transaction to call the "airdropERC721WithSignature" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ airdropERC721WithSignature }from"thirdweb/extensions/airdrop";consttransaction=airdropERC721WithSignature({contract,req:...,signature:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionairdropERC721WithSignature(options:BaseTransactionOptions<|AirdropERC721WithSignatureParams|{asyncParams:()=>Promise<AirdropERC721WithSignatureParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "airdropERC721WithSignature" function.

### Type

`letoptions:BaseTransactionOptions<|AirdropERC721WithSignatureParams|{asyncParams:()=>Promise<AirdropERC721WithSignatureParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

