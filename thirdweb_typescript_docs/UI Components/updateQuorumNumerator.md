# updateQuorumNumerator

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/updateQuorumNumerator](https://portal.thirdweb.com/references/typescript/v5/vote/updateQuorumNumerator)*

* References
* updateQuorumNumerator

Prepares a transaction to call the "updateQuorumNumerator" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ updateQuorumNumerator }from"thirdweb/extensions/vote";consttransaction=updateQuorumNumerator({contract,newQuorumNumerator:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionupdateQuorumNumerator(options:BaseTransactionOptions<|UpdateQuorumNumeratorParams|{asyncParams:()=>Promise<UpdateQuorumNumeratorParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "updateQuorumNumerator" function.

### Type

`letoptions:BaseTransactionOptions<|UpdateQuorumNumeratorParams|{asyncParams:()=>Promise<UpdateQuorumNumeratorParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

