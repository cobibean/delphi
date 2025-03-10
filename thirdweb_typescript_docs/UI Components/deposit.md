# deposit

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4626/deposit](https://portal.thirdweb.com/references/typescript/v5/erc4626/deposit)*

* References
* deposit

Prepares a transaction to call the "deposit" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ deposit }from"thirdweb/extensions/erc4626";consttransaction=deposit({contract,assets:...,receiver:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiondeposit(options:BaseTransactionOptions<DepositParams|{asyncParams:()=>Promise<DepositParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "deposit" function.

### Type

`letoptions:BaseTransactionOptions<DepositParams|{asyncParams:()=>Promise<DepositParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

