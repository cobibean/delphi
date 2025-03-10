# renounceOwnership

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/renounceOwnership](https://portal.thirdweb.com/references/typescript/v5/modules/renounceOwnership)*

* References
* renounceOwnership

Prepares a transaction to call the "renounceOwnership" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ renounceOwnership }from"thirdweb/extensions/modules";consttransaction=renounceOwnership();// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionrenounceOwnership(options:BaseTransactionOptions,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "renounceOwnership" function.

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

