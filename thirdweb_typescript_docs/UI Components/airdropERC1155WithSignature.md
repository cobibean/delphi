# airdropERC1155WithSignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC1155WithSignature](https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC1155WithSignature)*

* References
* airdropERC1155WithSignature

Prepares a transaction to call the "airdropERC1155WithSignature" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ airdropERC1155WithSignature }from"thirdweb/extensions/airdrop";consttransaction=airdropERC1155WithSignature({contract,req:...,signature:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionairdropERC1155WithSignature(options:BaseTransactionOptions<|AirdropERC1155WithSignatureParams|{asyncParams:()=>Promise<AirdropERC1155WithSignatureParams>;}>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "airdropERC1155WithSignature" function.

### Type

`letoptions:BaseTransactionOptions<|AirdropERC1155WithSignatureParams|{asyncParams:()=>Promise<AirdropERC1155WithSignatureParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

