# setPublisherProfileUri

*Source: [https://portal.thirdweb.com/references/typescript/v5/thirdweb/setPublisherProfileUri](https://portal.thirdweb.com/references/typescript/v5/thirdweb/setPublisherProfileUri)*

* References
* setPublisherProfileUri

Prepares a transaction to call the "setPublisherProfileUri" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setPublisherProfileUri }from"thirdweb/extensions/thirdweb";consttransaction=setPublisherProfileUri({contract,publisher:...,uri:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetPublisherProfileUri(options:BaseTransactionOptions<|SetPublisherProfileUriParams|{asyncParams:()=>Promise<SetPublisherProfileUriParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setPublisherProfileUri" function.

### Type

`letoptions:BaseTransactionOptions<|SetPublisherProfileUriParams|{asyncParams:()=>Promise<SetPublisherProfileUriParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

