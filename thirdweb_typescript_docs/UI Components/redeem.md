# redeem

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4626/redeem](https://portal.thirdweb.com/references/typescript/v5/erc4626/redeem)*

* References
* redeem

Prepares a transaction to call the "redeem" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ redeem }from"thirdweb/extensions/erc4626";consttransaction=redeem({contract,shares:...,receiver:...,owner:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionredeem(options:BaseTransactionOptions<RedeemParams|{asyncParams:()=>Promise<RedeemParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "redeem" function.

### Type

`letoptions:BaseTransactionOptions<RedeemParams|{asyncParams:()=>Promise<RedeemParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

