# airdropNativeToken

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropNativeToken](https://portal.thirdweb.com/references/typescript/v5/airdrop/airdropNativeToken)*

* References
* airdropNativeToken

Prepares a transaction to call the "airdropNativeToken" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ airdropNativeToken }from"thirdweb/extensions/airdrop";consttransaction=airdropNativeToken({contract,contents:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionairdropNativeToken(options:BaseTransactionOptions<|AirdropNativeTokenParams|{asyncParams:()=>Promise<AirdropNativeTokenParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "airdropNativeToken" function.

### Type

`letoptions:BaseTransactionOptions<|AirdropNativeTokenParams|{asyncParams:()=>Promise<AirdropNativeTokenParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

