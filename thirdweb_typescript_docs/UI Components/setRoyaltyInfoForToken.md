# setRoyaltyInfoForToken

*Source: [https://portal.thirdweb.com/references/typescript/v5/royaltyerc721/setRoyaltyInfoForToken](https://portal.thirdweb.com/references/typescript/v5/royaltyerc721/setRoyaltyInfoForToken)*

* References
* setRoyaltyInfoForToken

Prepares a transaction to call the "setRoyaltyInfoForToken" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ RoyaltyERC721 }from"thirdweb/modules";consttransaction=RoyaltyERC721.setRoyaltyInfoForToken({contract,tokenId:...,recipient:...,bps:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetRoyaltyInfoForToken(options:BaseTransactionOptions<|SetRoyaltyInfoForTokenParams|{asyncParams:()=>Promise<SetRoyaltyInfoForTokenParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setRoyaltyInfoForToken" function.

### Type

`letoptions:BaseTransactionOptions<|SetRoyaltyInfoForTokenParams|{asyncParams:()=>Promise<SetRoyaltyInfoForTokenParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

