# buyerApprovedForListingEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/buyerApprovedForListingEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/buyerApprovedForListingEvent)*

* References
* buyerApprovedForListingEvent

Creates an event object for the BuyerApprovedForListing event.

## Example

`import{ getContractEvents }from"thirdweb";import{ buyerApprovedForListingEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [buyerApprovedForListingEvent({listingId:...,buyer:...,})],});`
#### Signature

`functionbuyerApprovedForListingEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"listingId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"buyer";readonlytype:"address";},{readonlyname:"approved";readonlytype:"bool"},];readonlyname:"BuyerApprovedForListing";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"listingId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"buyer";readonlytype:"address";},{readonlyname:"approved";readonlytype:"bool"},];readonlyname:"BuyerApprovedForListing";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

