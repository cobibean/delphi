# auctionClosedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/auctionClosedEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/auctionClosedEvent)*

* References
* auctionClosedEvent

Creates an event object for the AuctionClosed event.

## Example

`import{ getContractEvents }from"thirdweb";import{ auctionClosedEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [auctionClosedEvent({auctionId:...,assetContract:...,closer:...,})],});`
#### Signature

`functionauctionClosedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"auctionId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlyindexed:true;readonlyname:"closer";readonlytype:"address";},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"auctionCreator";readonlytype:"address"},{readonlyname:"winningBidder";readonlytype:"address"},];readonlyname:"AuctionClosed";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"auctionId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlyindexed:true;readonlyname:"closer";readonlytype:"address";},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"auctionCreator";readonlytype:"address"},{readonlyname:"winningBidder";readonlytype:"address"},];readonlyname:"AuctionClosed";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

