# getRoleMember

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/getRoleMember](https://portal.thirdweb.com/references/typescript/v5/permissions/getRoleMember)*

* References
* getRoleMember

Retrieves a specific member of a specific role.

## Example

`import{ getRoleMember }from"thirdweb/extensions/permissions";constaddress=awaitgetRoleMember({contract,role:"admin",index:0n,});`
#### Signature

`functiongetRoleMember(options:BaseTransactionOptions<GetRoleMemberParams>,):Promise<string>;`
## Parameters

#### options

The options for retrieving the role member.

### Type

`letoptions:BaseTransactionOptions<GetRoleMemberParams>;`
## Returns

#### Return Type

`letreturnType:Promise<string>;`A promise that resolves to the address of the role member.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

