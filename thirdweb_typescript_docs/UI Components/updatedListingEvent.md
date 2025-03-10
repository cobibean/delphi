# updatedListingEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/updatedListingEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/updatedListingEvent)*

* References
* updatedListingEvent

Creates an event object for the UpdatedListing event.

## Example

`import{ getContractEvents }from"thirdweb";import{ updatedListingEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [updatedListingEvent({listingCreator:...,listingId:...,assetContract:...,})],});`
#### Signature

`functionupdatedListingEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"listingCreator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"listingId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlycomponents:readonly[{readonlyname:"listingId";readonlytype:"uint256"},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"quantity";readonlytype:"uint256"},{readonlyname:"pricePerToken";readonlytype:"uint256"},{readonlyname:"startTimestamp";readonlytype:"uint128"},{readonlyname:"endTimestamp";readonlytype:"uint128"},{readonlyname:"listingCreator";readonlytype:"address"},{readonlyname:"assetContract";readonlytype:"address"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"tokenType";readonlytype:"uint8"},{readonlyname:"status";readonlytype:"uint8"},{readonlyname:"reserved";readonlytype:"bool"},];readonlyname:"listing";readonlytype:"tuple";},];readonlyname:"UpdatedListing";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"listingCreator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"listingId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlycomponents:readonly[{readonlyname:"listingId";readonlytype:"uint256"},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"quantity";readonlytype:"uint256"},{readonlyname:"pricePerToken";readonlytype:"uint256"},{readonlyname:"startTimestamp";readonlytype:"uint128"},{readonlyname:"endTimestamp";readonlytype:"uint128"},{readonlyname:"listingCreator";readonlytype:"address"},{readonlyname:"assetContract";readonlytype:"address"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"tokenType";readonlytype:"uint8"},{readonlyname:"status";readonlytype:"uint8"},{readonlyname:"reserved";readonlytype:"bool"},];readonlyname:"listing";readonlytype:"tuple";},];readonlyname:"UpdatedListing";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

