# addAdmin

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/addAdmin](https://portal.thirdweb.com/references/typescript/v5/erc4337/addAdmin)*

* References
* addAdmin

Adds admin permissions for a specified address.

## Example

`import{ addAdmin }from"thirdweb/extensions/erc4337";import{ sendTransaction }from"thirdweb";consttransaction=addAdmin({contract,account,adminAddress:"0x...",});awaitsendTransaction({ transaction, account });`
#### Signature

`functionaddAdmin(options:BaseTransactionOptions<AddAdminOptions>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the addAdmin function.

### Type

`letoptions:BaseTransactionOptions<AddAdminOptions>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The transaction object to be sent.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

