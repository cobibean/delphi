# revokeRole

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/revokeRole](https://portal.thirdweb.com/references/typescript/v5/permissions/revokeRole)*

* References
* revokeRole

Revokes a role from a target account.

## Example

`import{ revokeRole }from"thirdweb/extensions/permissions";import{ sendTransaction }from"thirdweb";consttransaction=revokeRole({contract,role:"admin",targetAccountAddress:"0x1234567890123456789012345678901234567890",});awaitsendTransaction({ transaction, account });`
#### Signature

`functionrevokeRole(options:BaseTransactionOptions<RevokeRoleParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for revoking the role.

### Type

`letoptions:BaseTransactionOptions<RevokeRoleParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction that revokes the role when sent.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

