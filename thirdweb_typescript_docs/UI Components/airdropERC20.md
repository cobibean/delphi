# airdropERC20

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC20](https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropERC20)*

* References
* airdropERC20

Prepares a transaction to call the "airdropERC20" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ airdropERC20 }from"thirdweb/extensions/airdrop";consttransaction=airdropERC20({contract,tokenAddress:...,contents:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionairdropERC20(options:BaseTransactionOptions<|AirdropERC20Params|{asyncParams:()=>Promise<AirdropERC20Params> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "airdropERC20" function.

### Type

`letoptions:BaseTransactionOptions<|AirdropERC20Params|{asyncParams:()=>Promise<AirdropERC20Params> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

