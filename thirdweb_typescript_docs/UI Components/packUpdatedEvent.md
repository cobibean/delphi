# packUpdatedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/pack/packUpdatedEvent](https://portal.thirdweb.com/references/typescript/v5/pack/packUpdatedEvent)*

* References
* packUpdatedEvent

Creates an event object for the PackUpdated event.

## Example

`import{ getContractEvents }from"thirdweb";import{ packUpdatedEvent }from"thirdweb/extensions/pack";constevents=awaitgetContractEvents({contract,events: [packUpdatedEvent({packId:...,})],});`
#### Signature

`functionpackUpdatedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"packId";readonlytype:"uint256";},{readonlyname:"recipient";readonlytype:"address"},{readonlyname:"totalPacksCreated";readonlytype:"uint256"},];readonlyname:"PackUpdated";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"packId";readonlytype:"uint256";},{readonlyname:"recipient";readonlytype:"address"},{readonlyname:"totalPacksCreated";readonlytype:"uint256"},];readonlyname:"PackUpdated";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

