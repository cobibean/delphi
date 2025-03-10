# getAllRoleMembers

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/getAllRoleMembers](https://portal.thirdweb.com/references/typescript/v5/permissions/getAllRoleMembers)*

* References
* getAllRoleMembers

Retrieves all members of a specific role.

## Example

`import{ getAllRoleMembers }from"thirdweb/extensions/permissions";constresult=awaitgetAllRoleMembers({contract,role:"admin",});`
#### Signature

`functiongetAllRoleMembers(options:BaseTransactionOptions<GetAllRoleMembersParams>,):Promise<Array<string>>;`
## Parameters

#### options

The options for retrieving role members.

### Type

`letoptions:BaseTransactionOptions<GetAllRoleMembersParams>;`
## Returns

#### Return Type

`letreturnType:Promise<Array<string>>;`A promise that resolves to an array of strings representing the role members.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

