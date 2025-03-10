# setPrimarySaleRecipient

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/setPrimarySaleRecipient](https://portal.thirdweb.com/references/typescript/v5/common/setPrimarySaleRecipient)*

* References
* setPrimarySaleRecipient

Prepares a transaction to call the "setPrimarySaleRecipient" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setPrimarySaleRecipient }from"thirdweb/extensions/common";consttransaction=setPrimarySaleRecipient({contract,saleRecipient:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetPrimarySaleRecipient(options:BaseTransactionOptions<|SetPrimarySaleRecipientParams|{asyncParams:()=>Promise<SetPrimarySaleRecipientParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setPrimarySaleRecipient" function.

### Type

`letoptions:BaseTransactionOptions<|SetPrimarySaleRecipientParams|{asyncParams:()=>Promise<SetPrimarySaleRecipientParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

