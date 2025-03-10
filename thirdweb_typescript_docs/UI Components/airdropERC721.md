# airdropERC721

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC721](https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC721)*

* References
* airdropERC721

Prepares a transaction to call the "airdropERC721" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ airdropERC721 }from"thirdweb/extensions/airdrop";consttransaction=airdropERC721({contract,tokenAddress:...,contents:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionairdropERC721(options:BaseTransactionOptions<|AirdropERC721Params|{asyncParams:()=>Promise<AirdropERC721Params> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "airdropERC721" function.

### Type

`letoptions:BaseTransactionOptions<|AirdropERC721Params|{asyncParams:()=>Promise<AirdropERC721Params> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

