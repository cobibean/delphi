# CreateDirectListingButton

*Source: [https://portal.thirdweb.com/references/typescript/v5/CreateDirectListingButton](https://portal.thirdweb.com/references/typescript/v5/CreateDirectListingButton)*

* References
* CreateDirectListingButton

This button is used to create Direct listings for the thirdweb Marketplace v3 contract

It uses theTransactionButtonand thecreateListingextensionunder the hood
which means it inherits all the props of those 2 components.

`TransactionButton``createListing`
## Example

`import{ CreateDirectListingButton }from"thirdweb/react";<CreateDirectListingButtoncontractAddress="0x..."// contract address for the marketplace-v3chain={...}// the chain which the marketplace contract is deployed on// These props below are the same props for `createListing`// to get the full list, check the docs link abovetokenId={0n}assetContractAddress="0x..."// The NFT contract address whose NFT(s) you want to sellpricePerToken={"0.1"}// sell for 0.1 <native token>>Sell NFT</CreateDirectListingButton>`For error handling & callbacks on transaction-sent and transaction-confirmed,
please refer to the TransactionButton docs.

#### Signature

`functionCreateDirectListingButton(props:CreateDirectListingButtonProps,):Element;`
## Parameters

#### props

### Type

`letprops:Omit<TransactionButtonProps,"transaction">&CreateListingParams&{chain:Chain;client:ThirdwebClient;contractAddress:string;};`
## Returns

#### Return Type

`letreturnType:Element;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

