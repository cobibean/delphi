# cancelledOfferEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelledOfferEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelledOfferEvent)*

* References
* cancelledOfferEvent

Creates an event object for the CancelledOffer event.

## Example

`import{ getContractEvents }from"thirdweb";import{ cancelledOfferEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [cancelledOfferEvent({offeror:...,offerId:...,})],});`
#### Signature

`functioncancelledOfferEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"offeror";readonlytype:"address";},{readonlyindexed:true;readonlyname:"offerId";readonlytype:"uint256";},];readonlyname:"CancelledOffer";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"offeror";readonlytype:"address";},{readonlyindexed:true;readonlyname:"offerId";readonlytype:"uint256";},];readonlyname:"CancelledOffer";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

