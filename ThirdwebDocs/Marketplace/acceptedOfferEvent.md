# acceptedOfferEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/acceptedOfferEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/acceptedOfferEvent)*

* References
* acceptedOfferEvent

Creates an event object for the AcceptedOffer event.

## Example

`import{ getContractEvents }from"thirdweb";import{ acceptedOfferEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [acceptedOfferEvent({offeror:...,offerId:...,assetContract:...,})],});`
#### Signature

`functionacceptedOfferEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"offeror";readonlytype:"address";},{readonlyindexed:true;readonlyname:"offerId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"seller";readonlytype:"address"},{readonlyname:"quantityBought";readonlytype:"uint256"},{readonlyname:"totalPricePaid";readonlytype:"uint256"},];readonlyname:"AcceptedOffer";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"offeror";readonlytype:"address";},{readonlyindexed:true;readonlyname:"offerId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"seller";readonlytype:"address"},{readonlyname:"quantityBought";readonlytype:"uint256"},{readonlyname:"totalPricePaid";readonlytype:"uint256"},];readonlyname:"AcceptedOffer";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

