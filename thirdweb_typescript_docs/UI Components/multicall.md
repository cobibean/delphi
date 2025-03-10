# multicall

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/multicall](https://portal.thirdweb.com/references/typescript/v5/common/multicall)*

* References
* multicall

Prepares a transaction to call the "multicall" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ multicall }from"thirdweb/extensions/common";consttransaction=multicall({contract,data:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionmulticall(options:BaseTransactionOptions<MulticallParams|{asyncParams:()=>Promise<MulticallParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "multicall" function.

### Type

`letoptions:BaseTransactionOptions<MulticallParams|{asyncParams:()=>Promise<MulticallParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

