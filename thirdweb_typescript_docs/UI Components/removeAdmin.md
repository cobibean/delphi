# removeAdmin

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/removeAdmin](https://portal.thirdweb.com/references/typescript/v5/erc4337/removeAdmin)*

* References
* removeAdmin

Removes admin permissions for a specified address.

## Example

`import{ removeAdmin }from"thirdweb/extensions/erc4337";import{ sendTransaction }from"thirdweb";consttransaction=removeAdmin({contract,account,adminAddress:"0x...",});awaitsendTransaction({ transaction, account });`
#### Signature

`functionremoveAdmin(options:BaseTransactionOptions<RemoveAdminOptions>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the removeAdmin function.

### Type

`letoptions:BaseTransactionOptions<RemoveAdminOptions>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The transaction object to be sent.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

