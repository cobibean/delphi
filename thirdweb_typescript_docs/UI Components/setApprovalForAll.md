# setApprovalForAll

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/setApprovalForAll](https://portal.thirdweb.com/references/typescript/v5/erc721/setApprovalForAll)*

* References
* setApprovalForAll

Prepares a transaction to call the "setApprovalForAll" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setApprovalForAll }from"thirdweb/extensions/erc721";consttransaction=setApprovalForAll({contract,operator:...,approved:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetApprovalForAll(options:BaseTransactionOptions<|SetApprovalForAllParams|{asyncParams:()=>Promise<SetApprovalForAllParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setApprovalForAll" function.

### Type

`letoptions:BaseTransactionOptions<|SetApprovalForAllParams|{asyncParams:()=>Promise<SetApprovalForAllParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

