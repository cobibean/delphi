# grantRoles

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/grantRoles](https://portal.thirdweb.com/references/typescript/v5/modules/grantRoles)*

* References
* grantRoles

Prepares a transaction to call the "grantRoles" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ grantRoles }from"thirdweb/extensions/modules";consttransaction=grantRoles({contract,user:...,roles:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiongrantRoles(options:BaseTransactionOptions<|GrantRolesParams|{asyncParams:()=>Promise<GrantRolesParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "grantRoles" function.

### Type

`letoptions:BaseTransactionOptions<GrantRolesParams|{asyncParams:()=>Promise<GrantRolesParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

