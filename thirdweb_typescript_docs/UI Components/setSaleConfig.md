# setSaleConfig

*Source: [https://portal.thirdweb.com/references/typescript/v5/mintableerc721/setSaleConfig](https://portal.thirdweb.com/references/typescript/v5/mintableerc721/setSaleConfig)*

* References
* setSaleConfig

Prepares a transaction to call the "setSaleConfig" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ MintableERC721 }from"thirdweb/modules";consttransaction=MintableERC721.setSaleConfig({contract,primarySaleRecipient:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetSaleConfig(options:BaseTransactionOptions<|SetSaleConfigParams|{asyncParams:()=>Promise<SetSaleConfigParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setSaleConfig" function.

### Type

`letoptions:BaseTransactionOptions<|SetSaleConfigParams|{asyncParams:()=>Promise<SetSaleConfigParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

