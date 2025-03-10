# withdraw

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4626/withdraw](https://portal.thirdweb.com/references/typescript/v5/erc4626/withdraw)*

* References
* withdraw

Prepares a transaction to call the "withdraw" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ withdraw }from"thirdweb/extensions/erc4626";consttransaction=withdraw({contract,assets:...,receiver:...,owner:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionwithdraw(options:BaseTransactionOptions<WithdrawParams|{asyncParams:()=>Promise<WithdrawParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "withdraw" function.

### Type

`letoptions:BaseTransactionOptions<WithdrawParams|{asyncParams:()=>Promise<WithdrawParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

