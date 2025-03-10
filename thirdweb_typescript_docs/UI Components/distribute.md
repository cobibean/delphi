# distribute

*Source: [https://portal.thirdweb.com/references/typescript/v5/split/distribute](https://portal.thirdweb.com/references/typescript/v5/split/distribute)*

* References
* distribute

Prepares a transaction to call the "distribute" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ distribute }from"thirdweb/extensions/split";consttransaction=distribute();// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiondistribute(options:BaseTransactionOptions,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "distribute" function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

