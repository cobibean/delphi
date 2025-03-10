# createListing

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/createListing](https://portal.thirdweb.com/references/typescript/v5/marketplace/createListing)*

* References
* createListing

Creates a direct listing.

## Example

`import{ createListing }from"thirdweb/extensions/marketplace";import{ sendTransaction }from"thirdweb";consttransaction=createListing({assetContractAddress:"0x...",// the NFT contract address that you want to selltokenId={0n},// the token id you want to sellpricePerToken="0.1"// sell for 0.1 <native token>});awaitsendTransaction({ transaction, account });`
#### Signature

`functioncreateListing(options:BaseTransactionOptions<CreateListingParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for creating the direct listing.

### Type

`letoptions:BaseTransactionOptions<CreateListingParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The result of creating the direct listing.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

