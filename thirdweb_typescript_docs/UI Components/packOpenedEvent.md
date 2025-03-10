# packOpenedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/pack/packOpenedEvent](https://portal.thirdweb.com/references/typescript/v5/pack/packOpenedEvent)*

* References
* packOpenedEvent

Creates an event object for the PackOpened event.

## Example

`import{ getContractEvents }from"thirdweb";import{ packOpenedEvent }from"thirdweb/extensions/pack";constevents=awaitgetContractEvents({contract,events: [packOpenedEvent({packId:...,opener:...,})],});`
#### Signature

`functionpackOpenedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"packId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"opener";readonlytype:"address";},{readonlyname:"numOfPacksOpened";readonlytype:"uint256"},{readonlycomponents:readonly[{readonlyname:"assetContract";readonlytype:"address"},{readonlyname:"tokenType";readonlytype:"uint8"},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"totalAmount";readonlytype:"uint256"},];readonlyname:"rewardUnitsDistributed";readonlytype:"tuple[]";},];readonlyname:"PackOpened";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"packId";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"opener";readonlytype:"address";},{readonlyname:"numOfPacksOpened";readonlytype:"uint256"},{readonlycomponents:readonly[{readonlyname:"assetContract";readonlytype:"address"},{readonlyname:"tokenType";readonlytype:"uint8"},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"totalAmount";readonlytype:"uint256"},];readonlyname:"rewardUnitsDistributed";readonlytype:"tuple[]";},];readonlyname:"PackOpened";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

