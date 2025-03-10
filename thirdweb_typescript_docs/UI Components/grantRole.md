# grantRole

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/grantRole](https://portal.thirdweb.com/references/typescript/v5/permissions/grantRole)*

* References
* grantRole

Grants a role to a target account.

## Example

`import{ grantRole }from"thirdweb/extensions/permissions";import{ sendTransaction }from"thirdweb";consttransaction=grantRole({contract,role:"admin",targetAccountAddress:"0x1234567890123456789012345678901234567890",});awaitsendTransaction({ transaction, account });`
#### Signature

`functiongrantRole(options:BaseTransactionOptions<GrantRoleParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for granting the role.

### Type

`letoptions:BaseTransactionOptions<GrantRoleParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction that grants the role when sent.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

