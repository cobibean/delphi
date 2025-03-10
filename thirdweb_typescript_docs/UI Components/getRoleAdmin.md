# getRoleAdmin

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/getRoleAdmin](https://portal.thirdweb.com/references/typescript/v5/permissions/getRoleAdmin)*

* References
* getRoleAdmin

Gets the admin of a role.

## Example

`import{ getRoleAdmin }from"thirdweb/extensions/permissions";constresult=awaitgetRoleAdmin({contract,role:"admin",});`
#### Signature

`functiongetRoleAdmin(options:BaseTransactionOptions<GetRoleAdminParams>,):Promise<string>;`
## Parameters

#### options

The options for getting the role's admin.

### Type

`letoptions:BaseTransactionOptions<GetRoleAdminParams>;`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The address of the role's admin.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

