# newOfferEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/newOfferEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/newOfferEvent)*

* References
* newOfferEvent

Creates an event object for the NewOffer event.

## Example

`import{ getContractEvents }from"thirdweb";import{ newOfferEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [newOfferEvent({offeror:...,offerId:...,assetContract:...,})],});`
#### Signature

`functionnewOfferEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"offeror";readonlytype:"address";},{readonlyindexed:true;readonlyname:"offerId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlycomponents:readonly[{readonlyname:"offerId";readonlytype:"uint256"},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"quantity";readonlytype:"uint256"},{readonlyname:"totalPrice";readonlytype:"uint256"},{readonlyname:"expirationTimestamp";readonlytype:"uint256";},{readonlyname:"offeror";readonlytype:"address"},{readonlyname:"assetContract";readonlytype:"address"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"tokenType";readonlytype:"uint8"},{readonlyname:"status";readonlytype:"uint8"},];readonlyname:"offer";readonlytype:"tuple";},];readonlyname:"NewOffer";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"offeror";readonlytype:"address";},{readonlyindexed:true;readonlyname:"offerId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlycomponents:readonly[{readonlyname:"offerId";readonlytype:"uint256"},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"quantity";readonlytype:"uint256"},{readonlyname:"totalPrice";readonlytype:"uint256"},{readonlyname:"expirationTimestamp";readonlytype:"uint256";},{readonlyname:"offeror";readonlytype:"address"},{readonlyname:"assetContract";readonlytype:"address"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"tokenType";readonlytype:"uint8"},{readonlyname:"status";readonlytype:"uint8"},];readonlyname:"offer";readonlytype:"tuple";},];readonlyname:"NewOffer";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

