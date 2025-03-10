# renounceRole

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/renounceRole](https://portal.thirdweb.com/references/typescript/v5/permissions/renounceRole)*

* References
* renounceRole

Lets the target account renounce the role. (The target account must be the sender of the transaction.)

## Example

`import{ renounceRole }from"thirdweb/extensions/permissions";import{ sendTransaction }from"thirdweb";consttransaction=renounceRole({contract,role:"admin",targetAccountAddress:"0x1234567890123456789012345678901234567890",});awaitsendTransaction({ transaction, account });`
#### Signature

`functionrenounceRole(options:BaseTransactionOptions<RenounceRoleParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for renouncing the role.

### Type

`letoptions:BaseTransactionOptions<RenounceRoleParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction that revokes the role when sent.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

