# requestOwnershipHandover

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/requestOwnershipHandover](https://portal.thirdweb.com/references/typescript/v5/modules/requestOwnershipHandover)*

* References
* requestOwnershipHandover

Prepares a transaction to call the "requestOwnershipHandover" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ requestOwnershipHandover }from"thirdweb/extensions/modules";consttransaction=requestOwnershipHandover();// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionrequestOwnershipHandover(options:BaseTransactionOptions,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "requestOwnershipHandover" function.

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

