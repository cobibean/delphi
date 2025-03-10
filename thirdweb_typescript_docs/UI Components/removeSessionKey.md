# removeSessionKey

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/removeSessionKey](https://portal.thirdweb.com/references/typescript/v5/erc4337/removeSessionKey)*

* References
* removeSessionKey

Removes session key permissions for a specified address.

## Example

`import{ removeSessionKey }from"thirdweb/extensions/erc4337";import{ sendTransaction }from"thirdweb";consttransaction=removeSessionKey({contract,account,sessionKeyAddress,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionremoveSessionKey(options:BaseTransactionOptions<RemoveSessionKeyOptions>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the removeSessionKey function.

### Type

`letoptions:BaseTransactionOptions<RemoveSessionKeyOptions>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The transaction object to be sent.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

