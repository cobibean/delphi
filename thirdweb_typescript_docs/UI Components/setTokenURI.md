# setTokenURI

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/setTokenURI](https://portal.thirdweb.com/references/typescript/v5/erc721/setTokenURI)*

* References
* setTokenURI

Prepares a transaction to call the "setTokenURI" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setTokenURI }from"thirdweb/extensions/erc721";consttransaction=setTokenURI({contract,tokenId:...,uri:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetTokenURI(options:BaseTransactionOptions<|SetTokenURIParams|{asyncParams:()=>Promise<SetTokenURIParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setTokenURI" function.

### Type

`letoptions:BaseTransactionOptions<|SetTokenURIParams|{asyncParams:()=>Promise<SetTokenURIParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

