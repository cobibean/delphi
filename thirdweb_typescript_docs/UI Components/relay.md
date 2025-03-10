# relay

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/relay](https://portal.thirdweb.com/references/typescript/v5/vote/relay)*

* References
* relay

Prepares a transaction to call the "relay" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ relay }from"thirdweb/extensions/vote";consttransaction=relay({contract,target:...,value:...,data:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionrelay(options:BaseTransactionOptions<RelayParams|{asyncParams:()=>Promise<RelayParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "relay" function.

### Type

`letoptions:BaseTransactionOptions<RelayParams|{asyncParams:()=>Promise<RelayParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

