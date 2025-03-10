# currencyApprovedForListingEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/currencyApprovedForListingEvent](https://portal.thirdweb.com/references/typescript/v5/marketplace/currencyApprovedForListingEvent)*

* References
* currencyApprovedForListingEvent

Creates an event object for the CurrencyApprovedForListing event.

## Example

`import{ getContractEvents }from"thirdweb";import{ currencyApprovedForListingEvent }from"thirdweb/extensions/marketplace";constevents=awaitgetContractEvents({contract,events: [currencyApprovedForListingEvent({listingId:...,currency:...,})],});`
#### Signature

`functioncurrencyApprovedForListingEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"listingId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"currency";readonlytype:"address";},{readonlyname:"pricePerToken";readonlytype:"uint256"},];readonlyname:"CurrencyApprovedForListing";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"listingId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"currency";readonlytype:"address";},{readonlyname:"pricePerToken";readonlytype:"uint256"},];readonlyname:"CurrencyApprovedForListing";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

