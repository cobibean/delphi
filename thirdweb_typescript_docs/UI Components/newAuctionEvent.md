# newAuctionEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/newAuctionEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/newAuctionEvent)*

* References
* newAuctionEvent

Creates an event object for the NewAuction event.

## Example

`import{ getContractEvents }from"thirdweb";import{ newAuctionEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [newAuctionEvent({auctionCreator:...,auctionId:...,assetContract:...,})],});`
#### Signature

`functionnewAuctionEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"auctionCreator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"auctionId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlycomponents:readonly[{readonlyname:"auctionId";readonlytype:"uint256"},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"quantity";readonlytype:"uint256"},{readonlyname:"minimumBidAmount";readonlytype:"uint256";},{readonlyname:"buyoutBidAmount";readonlytype:"uint256";},{readonlyname:"timeBufferInSeconds";readonlytype:"uint64";},{readonlyname:"bidBufferBps";readonlytype:"uint64"},{readonlyname:"startTimestamp";readonlytype:"uint64"},{readonlyname:"endTimestamp";readonlytype:"uint64"},{readonlyname:"auctionCreator";readonlytype:"address"},{readonlyname:"assetContract";readonlytype:"address"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"tokenType";readonlytype:"uint8"},{readonlyname:"status";readonlytype:"uint8"},];readonlyname:"auction";readonlytype:"tuple";},];readonlyname:"NewAuction";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"auctionCreator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"auctionId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlycomponents:readonly[{readonlyname:"auctionId";readonlytype:"uint256"},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"quantity";readonlytype:"uint256"},{readonlyname:"minimumBidAmount";readonlytype:"uint256";},{readonlyname:"buyoutBidAmount";readonlytype:"uint256";},{readonlyname:"timeBufferInSeconds";readonlytype:"uint64";},{readonlyname:"bidBufferBps";readonlytype:"uint64"},{readonlyname:"startTimestamp";readonlytype:"uint64"},{readonlyname:"endTimestamp";readonlytype:"uint64"},{readonlyname:"auctionCreator";readonlytype:"address"},{readonlyname:"assetContract";readonlytype:"address"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"tokenType";readonlytype:"uint8"},{readonlyname:"status";readonlytype:"uint8"},];readonlyname:"auction";readonlytype:"tuple";},];readonlyname:"NewAuction";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

