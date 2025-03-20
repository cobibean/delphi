# BuyDirectListingButton

*Source: [https://portal.thirdweb.com/references/typescript/v5/BuyDirectListingButton](https://portal.thirdweb.com/references/typescript/v5/BuyDirectListingButton)*

* References
* BuyDirectListingButton

This button is used with thirdweb Marketplace v3 contract, for buying NFT(s) from a listing.

Under the hood, it prepares a transaction using thebuyFromListingextensionand then pass it to a<TransactionButton />

`buyFromListing``<TransactionButton />`Since it uses the TransactionButton, it can take in any props that can be passed
to theTransactionButton

`TransactionButton`
## Example

`import{ BuyDirectListingButton }from"thirdweb/react";<BuyDirectListingButtoncontractAddress="0x..."// contract address of the marketplace v3chain={...}// the chain which the marketplace contract is deployed onclient={...}// thirdweb clientlistingId={100n}// the listingId or the item you want to buyquantity={1n}// optional - see the docs to learn more>Buy NFT</BuyDirectListingButton>`For error handling & callbacks on transaction-sent and transaction-confirmed,
please refer to the TransactionButton docs.

#### Signature

`functionBuyDirectListingButton(props:BuyDirectListingButtonProps,):Element;`
## Parameters

#### props

### Type

`letprops:Omit<TransactionButtonProps,"transaction">&{chain:Chain;client:ThirdwebClient;contractAddress:string;listingId:bigint;quantity?:bigint;};`
## Returns

#### Return Type

`letreturnType:Element;``<TransactionButton />`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

