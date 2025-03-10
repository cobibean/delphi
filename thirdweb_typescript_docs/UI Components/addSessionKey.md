# addSessionKey

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/addSessionKey](https://portal.thirdweb.com/references/typescript/v5/erc4337/addSessionKey)*

* References
* addSessionKey

Adds session key permissions for a specified address.

## Example

`import{ addSessionKey }from"thirdweb/extensions/erc4337";import{ sendTransaction }from"thirdweb";consttransaction=addSessionKey({contract,account,sessionKeyAddress,permissions: {approvedTargets: ["0x..."],nativeTokenLimitPerTransaction:0.1,// in ETHpermissionStartTimestamp:newDate(),permissionEndTimestamp:newDate(Date.now()+1000*60*60*24*365,),// 1 year from now},});awaitsendTransaction({ transaction, account });`
#### Signature

`functionaddSessionKey(options:BaseTransactionOptions<AddSessionKeyOptions>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the removeSessionKey function.

### Type

`letoptions:BaseTransactionOptions<AddSessionKeyOptions>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The transaction object to be sent.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

