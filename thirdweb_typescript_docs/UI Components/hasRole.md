# hasRole

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/hasRole](https://portal.thirdweb.com/references/typescript/v5/permissions/hasRole)*

* References
* hasRole

Checks if the target account has the role.

## Example

`import{ hasRole }from"thirdweb/extensions/permissions";constresult=awaithasRole({contract,role:"admin",targetAccountAddress:"0x1234567890123456789012345678901234567890",});`
#### Signature

`functionhasRole(options:BaseTransactionOptions<HasRoleParams>,):Promise<boolean>;`
## Parameters

#### options

The options for checking the role.

### Type

`letoptions:BaseTransactionOptions<HasRoleParams>;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A boolean that is true if the target account has the role.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

