# cancelledListingEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelledListingEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelledListingEvent)*

* References
* cancelledListingEvent

Creates an event object for the CancelledListing event.

## Example

`import{ getContractEvents }from"thirdweb";import{ cancelledListingEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [cancelledListingEvent({listingCreator:...,listingId:...,})],});`
#### Signature

`functioncancelledListingEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"listingCreator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"listingId";readonlytype:"uint256";},];readonlyname:"CancelledListing";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"listingCreator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"listingId";readonlytype:"uint256";},];readonlyname:"CancelledListing";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

