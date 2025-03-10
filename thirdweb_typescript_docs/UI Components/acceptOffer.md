# acceptOffer

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/acceptOffer](https://portal.thirdweb.com/references/typescript/v5/marketplace/acceptOffer)*

* References
* acceptOffer

Accepts an offer after performing necessary checks and validations.
Throws an error if the offer is not active, the offeror's balance is insufficient,
or the offeror's allowance is insufficient.

## Example

`import{ acceptOffer }from"thirdweb/extensions/marketplace";import{ sendTransaction }from"thirdweb";constacceptOfferTx=acceptOffer({contract,offerId:1n,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionacceptOffer(options:BaseTransactionOptions<AcceptOfferParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for accepting the offer.

### Type

`letoptions:BaseTransactionOptions<AcceptOfferParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction object that can be sent to accept the offer.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

