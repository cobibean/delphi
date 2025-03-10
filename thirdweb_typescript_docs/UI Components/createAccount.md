# createAccount

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/createAccount](https://portal.thirdweb.com/references/typescript/v5/erc4337/createAccount)*

* References
* createAccount

Prepares a transaction to call the "createAccount" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ createAccount }from"thirdweb/extensions/erc4337";consttransaction=createAccount({contract,admin:...,data:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncreateAccount(options:BaseTransactionOptions<|CreateAccountParams|{asyncParams:()=>Promise<CreateAccountParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "createAccount" function.

### Type

`letoptions:BaseTransactionOptions<|CreateAccountParams|{asyncParams:()=>Promise<CreateAccountParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

