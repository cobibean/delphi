# freezeMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/freezeMetadata](https://portal.thirdweb.com/references/typescript/v5/erc1155/freezeMetadata)*

* References
* freezeMetadata

Prepares a transaction to call the "freezeMetadata" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ freezeMetadata }from"thirdweb/extensions/erc1155";consttransaction=freezeMetadata();// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionfreezeMetadata(options:BaseTransactionOptions,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "freezeMetadata" function.

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

