# isBuyerApprovedForListing

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/isBuyerApprovedForListing](https://portal.thirdweb.com/references/typescript/v5/marketplace/isBuyerApprovedForListing)*

* References
* isBuyerApprovedForListing

Checks if the buyer is approved for a listing.

## Example

`import{ isBuyerApprovedForListing }from"thirdweb/extensions/marketplace";constisApproved=awaitisBuyerApprovedForListing({contract,listingId:1n,buyer:"0x...",});`
#### Signature

`functionisBuyerApprovedForListing(options:BaseTransactionOptions<IsBuyerApprovedForListingParams>,):Promise<boolean>;`
## Parameters

#### options

The options for checking buyer approval.

### Type

`letoptions:BaseTransactionOptions<IsBuyerApprovedForListingParams>;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A promise that resolves to a boolean indicating whether the buyer is approved for the listing.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

