# getRoleMemberCount

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/getRoleMemberCount](https://portal.thirdweb.com/references/typescript/v5/permissions/getRoleMemberCount)*

* References
* getRoleMemberCount

Retrieves the number of members of a specific role.

## Example

`import{ getRoleMemberCount }from"thirdweb/extensions/permissions";constresult=awaitgetRoleMemberCount({contract,role:"admin",});`
#### Signature

`functiongetRoleMemberCount(options:BaseTransactionOptions<GetRoleMemberCountParams>,):Promise<bigint>;`
## Parameters

#### options

The options for retrieving role member count.

### Type

`letoptions:BaseTransactionOptions<GetRoleMemberCountParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the number of members of the role.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

