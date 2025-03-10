# cancelledAuctionEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelledAuctionEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelledAuctionEvent)*

* References
* cancelledAuctionEvent

Creates an event object for the CancelledAuction event.

## Example

`import{ getContractEvents }from"thirdweb";import{ cancelledAuctionEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [cancelledAuctionEvent({auctionCreator:...,auctionId:...,})],});`
#### Signature

`functioncancelledAuctionEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"auctionCreator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"auctionId";readonlytype:"uint256";},];readonlyname:"CancelledAuction";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"auctionCreator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"auctionId";readonlytype:"uint256";},];readonlyname:"CancelledAuction";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

