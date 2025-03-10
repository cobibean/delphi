# cancelOwnershipHandover

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/cancelOwnershipHandover](https://portal.thirdweb.com/references/typescript/v5/modules/cancelOwnershipHandover)*

* References
* cancelOwnershipHandover

Prepares a transaction to call the "cancelOwnershipHandover" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ cancelOwnershipHandover }from"thirdweb/extensions/modules";consttransaction=cancelOwnershipHandover();// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncancelOwnershipHandover(options:BaseTransactionOptions,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "cancelOwnershipHandover" function.

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

