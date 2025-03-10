# cancelOffer

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelOffer](https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelOffer)*

* References
* cancelOffer

Prepares a transaction to call the "cancelOffer" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ cancelOffer }from"thirdweb/extensions/marketplace";consttransaction=cancelOffer({contract,offerId:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncancelOffer(options:BaseTransactionOptions<|CancelOfferParams|{asyncParams:()=>Promise<CancelOfferParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "cancelOffer" function.

### Type

`letoptions:BaseTransactionOptions<|CancelOfferParams|{asyncParams:()=>Promise<CancelOfferParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

