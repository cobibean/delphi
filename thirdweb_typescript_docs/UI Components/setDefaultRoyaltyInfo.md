# setDefaultRoyaltyInfo

*Source: [https://portal.thirdweb.com/references/typescript/v5/royaltyerc721/setDefaultRoyaltyInfo](https://portal.thirdweb.com/references/typescript/v5/royaltyerc721/setDefaultRoyaltyInfo)*

* References
* setDefaultRoyaltyInfo

Prepares a transaction to call the "setDefaultRoyaltyInfo" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ RoyaltyERC721 }from"thirdweb/modules";consttransaction=RoyaltyERC721.setDefaultRoyaltyInfo({contract,royaltyRecipient:...,royaltyBps:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetDefaultRoyaltyInfo(options:BaseTransactionOptions<|SetDefaultRoyaltyInfoParams|{asyncParams:()=>Promise<SetDefaultRoyaltyInfoParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setDefaultRoyaltyInfo" function.

### Type

`letoptions:BaseTransactionOptions<|SetDefaultRoyaltyInfoParams|{asyncParams:()=>Promise<SetDefaultRoyaltyInfoParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

