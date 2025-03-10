# delegate

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/delegate](https://portal.thirdweb.com/references/typescript/v5/erc20/delegate)*

* References
* delegate

Prepares a transaction to call the "delegate" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ delegate }from"thirdweb/extensions/erc20";consttransaction=delegate({contract,delegatee:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiondelegate(options:BaseTransactionOptions<DelegateParams|{asyncParams:()=>Promise<DelegateParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "delegate" function.

### Type

`letoptions:BaseTransactionOptions<DelegateParams|{asyncParams:()=>Promise<DelegateParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

