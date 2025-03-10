# prepareTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/prepareTransaction](https://portal.thirdweb.com/references/typescript/v5/prepareTransaction)*

* References
* prepareTransaction

Prepares a transaction with the given options.

## Example

`import{ prepareTransaction, toWei }from"thirdweb";import{ ethereum }from"thirdweb/chains";consttransaction=prepareTransaction({to:"0x1234567890123456789012345678901234567890",chain: ethereum,client: thirdwebClient,value:toWei("1.0"),gasPrice:30n,});`
#### Signature

`functionprepareTransaction(options:PrepareTransactionOptions,info?:Additional<abi,abiFn>,):PreparedTransaction<abi,abiFn,PrepareTransactionOptions>;`
## Parameters

#### options

The options for preparing the transaction.

### Type

`letoptions:{chain:Chain;client:ThirdwebClient;}&PromisedObject<Omit<StaticPrepareTransactionOptions,"chain"|"client">>;`
#### info

Additional information about the ABI function.

### Type

`letinfo:Additional<abi,abiFn>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<abi,abiFn,PrepareTransactionOptions>;`The prepared transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

