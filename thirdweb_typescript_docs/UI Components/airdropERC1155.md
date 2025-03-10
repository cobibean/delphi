# airdropERC1155

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC1155](https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC1155)*

* References
* airdropERC1155

Prepares a transaction to call the "airdropERC1155" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ airdropERC1155 }from"thirdweb/extensions/airdrop";consttransaction=airdropERC1155({contract,tokenAddress:...,contents:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionairdropERC1155(options:BaseTransactionOptions<|AirdropERC1155Params|{asyncParams:()=>Promise<AirdropERC1155Params> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "airdropERC1155" function.

### Type

`letoptions:BaseTransactionOptions<|AirdropERC1155Params|{asyncParams:()=>Promise<AirdropERC1155Params> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

