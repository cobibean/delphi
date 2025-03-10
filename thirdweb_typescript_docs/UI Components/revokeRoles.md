# revokeRoles

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/revokeRoles](https://portal.thirdweb.com/references/typescript/v5/modules/revokeRoles)*

* References
* revokeRoles

Prepares a transaction to call the "revokeRoles" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ revokeRoles }from"thirdweb/extensions/modules";consttransaction=revokeRoles({contract,user:...,roles:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionrevokeRoles(options:BaseTransactionOptions<|RevokeRolesParams|{asyncParams:()=>Promise<RevokeRolesParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "revokeRoles" function.

### Type

`letoptions:BaseTransactionOptions<|RevokeRolesParams|{asyncParams:()=>Promise<RevokeRolesParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

