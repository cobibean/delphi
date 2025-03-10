# setTransferValidator

*Source: [https://portal.thirdweb.com/references/typescript/v5/royaltyerc721/setTransferValidator](https://portal.thirdweb.com/references/typescript/v5/royaltyerc721/setTransferValidator)*

* References
* setTransferValidator

Prepares a transaction to call the "setTransferValidator" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ RoyaltyERC721 }from"thirdweb/modules";consttransaction=RoyaltyERC721.setTransferValidator({contract,validator:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetTransferValidator(options:BaseTransactionOptions<|SetTransferValidatorParams|{asyncParams:()=>Promise<SetTransferValidatorParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setTransferValidator" function.

### Type

`letoptions:BaseTransactionOptions<|SetTransferValidatorParams|{asyncParams:()=>Promise<SetTransferValidatorParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

