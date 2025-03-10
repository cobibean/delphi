# burnFrom

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/burnFrom](https://portal.thirdweb.com/references/typescript/v5/erc20/burnFrom)*

* References
* burnFrom

Prepares a transaction to call the "burnFrom" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ burnFrom }from"thirdweb/extensions/erc20";consttransaction=burnFrom({contract,account:...,amount:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionburnFrom(options:BaseTransactionOptions<BurnFromParams|{asyncParams:()=>Promise<BurnFromParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "burnFrom" function.

### Type

`letoptions:BaseTransactionOptions<BurnFromParams|{asyncParams:()=>Promise<BurnFromParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

