# grantMinterRole

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/grantMinterRole](https://portal.thirdweb.com/references/typescript/v5/common/grantMinterRole)*

* References
* grantMinterRole

Grants the minter role to a user.

## Example

`import{ grantMinterRole }from"thirdweb/modules";consttx=awaitgrantMinterRole({contract,user: userAddress,});`
#### Signature

`functiongrantMinterRole(options:BaseTransactionOptions<GrantMinterRoleParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:BaseTransactionOptions<GrantMinterRoleParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The transaction to send.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

