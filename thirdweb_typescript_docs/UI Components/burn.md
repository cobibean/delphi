# burn

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/burn](https://portal.thirdweb.com/references/typescript/v5/erc20/burn)*

* References
* burn

Prepares a transaction to call the "burn" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ burn }from"thirdweb/extensions/erc20";consttransaction=burn({contract,amount:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionburn(options:BaseTransactionOptions<BurnParams|{asyncParams:()=>Promise<BurnParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "burn" function.

### Type

`letoptions:BaseTransactionOptions<BurnParams|{asyncParams:()=>Promise<BurnParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

