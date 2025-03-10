# newSaleEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/newSaleEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/newSaleEvent)*

* References
* newSaleEvent

Creates an event object for the NewSale event.

## Example

`import{ getContractEvents }from"thirdweb";import{ newSaleEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [newSaleEvent({listingCreator:...,listingId:...,assetContract:...,})],});`
#### Signature

`functionnewSaleEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"listingCreator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"listingId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"buyer";readonlytype:"address"},{readonlyname:"quantityBought";readonlytype:"uint256"},{readonlyname:"totalPricePaid";readonlytype:"uint256"},];readonlyname:"NewSale";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"listingCreator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"listingId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"assetContract";readonlytype:"address";},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"buyer";readonlytype:"address"},{readonlyname:"quantityBought";readonlytype:"uint256"},{readonlyname:"totalPricePaid";readonlytype:"uint256"},];readonlyname:"NewSale";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

