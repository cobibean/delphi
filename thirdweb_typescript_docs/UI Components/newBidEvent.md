# newBidEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/newBidEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/newBidEvent)*

* References
* newBidEvent

Creates an event object for the NewBid event.

## Example

`import{ getContractEvents }from"thirdweb";import{ newBidEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [newBidEvent({auctionId:...,bidder:...,assetContract:...,})],});`
#### Signature

`functionnewBidEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"auctionId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"bidder";readonlytype:"address";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlyname:"bidAmount";readonlytype:"uint256"},{readonlycomponents:readonly[{readonlyname:"auctionId";readonlytype:"uint256"},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"quantity";readonlytype:"uint256"},{readonlyname:"minimumBidAmount";readonlytype:"uint256";},{readonlyname:"buyoutBidAmount";readonlytype:"uint256";},{readonlyname:"timeBufferInSeconds";readonlytype:"uint64";},{readonlyname:"bidBufferBps";readonlytype:"uint64"},{readonlyname:"startTimestamp";readonlytype:"uint64"},{readonlyname:"endTimestamp";readonlytype:"uint64"},{readonlyname:"auctionCreator";readonlytype:"address"},{readonlyname:"assetContract";readonlytype:"address"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"tokenType";readonlytype:"uint8"},{readonlyname:"status";readonlytype:"uint8"},];readonlyname:"auction";readonlytype:"tuple";},];readonlyname:"NewBid";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"auctionId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"bidder";readonlytype:"address";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlyname:"bidAmount";readonlytype:"uint256"},{readonlycomponents:readonly[{readonlyname:"auctionId";readonlytype:"uint256"},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"quantity";readonlytype:"uint256"},{readonlyname:"minimumBidAmount";readonlytype:"uint256";},{readonlyname:"buyoutBidAmount";readonlytype:"uint256";},{readonlyname:"timeBufferInSeconds";readonlytype:"uint64";},{readonlyname:"bidBufferBps";readonlytype:"uint64"},{readonlyname:"startTimestamp";readonlytype:"uint64"},{readonlyname:"endTimestamp";readonlytype:"uint64"},{readonlyname:"auctionCreator";readonlytype:"address"},{readonlyname:"assetContract";readonlytype:"address"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"tokenType";readonlytype:"uint8"},{readonlyname:"status";readonlytype:"uint8"},];readonlyname:"auction";readonlytype:"tuple";},];readonlyname:"NewBid";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

