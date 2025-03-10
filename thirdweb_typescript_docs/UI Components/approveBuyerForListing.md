# approveBuyerForListing

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/approveBuyerForListing](https://portal.thirdweb.com/references/typescript/v5/marketplace/approveBuyerForListing)*

* References
* approveBuyerForListing

Prepares a transaction to call the "approveBuyerForListing" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ approveBuyerForListing }from"thirdweb/extensions/marketplace";consttransaction=approveBuyerForListing({contract,listingId:...,buyer:...,toApprove:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionapproveBuyerForListing(options:BaseTransactionOptions<|ApproveBuyerForListingParams|{asyncParams:()=>Promise<ApproveBuyerForListingParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "approveBuyerForListing" function.

### Type

`letoptions:BaseTransactionOptions<|ApproveBuyerForListingParams|{asyncParams:()=>Promise<ApproveBuyerForListingParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

