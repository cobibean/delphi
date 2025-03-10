# makeOffer

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/makeOffer](https://portal.thirdweb.com/references/typescript/v5/marketplace/makeOffer)*

* References
* makeOffer

Makes an offer for any asset (ERC721 or ERC1155).

## Example

`import{ makeOffer }from"thirdweb/extensions/marketplace";import{ sendTransaction }from"thirdweb";constofferTx=makeOffer({contract,assetContractAddress:"0x1234567890123456789012345678901234567890",tokenId:1n,currencyContractAddress:"0x1234567890123456789012345678901234567890",offerExpiresAt:newDate(Date.now()+1000*60*60*24),totalOffer:"1.0",});awaitsendTransaction({ transaction, account });`
#### Signature

`functionmakeOffer(options:BaseTransactionOptions<MakeOfferParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for making the offer.

### Type

`letoptions:BaseTransactionOptions<MakeOfferParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction object that can be sent to make the offer.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

