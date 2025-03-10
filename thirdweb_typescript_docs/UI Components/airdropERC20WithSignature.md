# airdropERC20WithSignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC20WithSignature](https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC20WithSignature)*

* References
* airdropERC20WithSignature

Prepares a transaction to call the "airdropERC20WithSignature" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ airdropERC20WithSignature }from"thirdweb/extensions/airdrop";consttransaction=airdropERC20WithSignature({contract,req:...,signature:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionairdropERC20WithSignature(options:BaseTransactionOptions<|AirdropERC20WithSignatureParams|{asyncParams:()=>Promise<AirdropERC20WithSignatureParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "airdropERC20WithSignature" function.

### Type

`letoptions:BaseTransactionOptions<|AirdropERC20WithSignatureParams|{asyncParams:()=>Promise<AirdropERC20WithSignatureParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

