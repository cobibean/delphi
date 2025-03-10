# packCreatedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/pack/packCreatedEvent](https://portal.thirdweb.com/references/typescript/v5/pack/packCreatedEvent)*

* References
* packCreatedEvent

Creates an event object for the PackCreated event.

## Example

`import{ getContractEvents }from"thirdweb";import{ packCreatedEvent }from"thirdweb/extensions/pack";constevents=awaitgetContractEvents({contract,events: [packCreatedEvent({packId:...,})],});`
#### Signature

`functionpackCreatedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"packId";readonlytype:"uint256";},{readonlyname:"recipient";readonlytype:"address"},{readonlyname:"totalPacksCreated";readonlytype:"uint256"},];readonlyname:"PackCreated";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"packId";readonlytype:"uint256";},{readonlyname:"recipient";readonlytype:"address"},{readonlyname:"totalPacksCreated";readonlytype:"uint256"},];readonlyname:"PackCreated";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

