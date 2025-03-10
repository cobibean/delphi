# ownerUpdatedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/ownerUpdatedEvent](https://portal.thirdweb.com/references/typescript/v5/common/ownerUpdatedEvent)*

* References
* ownerUpdatedEvent

Creates an event object for the OwnerUpdated event.

## Example

`import{ getContractEvents }from"thirdweb";import{ ownerUpdatedEvent }from"thirdweb/extensions/common";constevents=awaitgetContractEvents({contract,events: [ownerUpdatedEvent({prevOwner:...,newOwner:...,})],});`
#### Signature

`functionownerUpdatedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"prevOwner";readonlytype:"address";},{readonlyindexed:true;readonlyname:"newOwner";readonlytype:"address";},];readonlyname:"OwnerUpdated";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"prevOwner";readonlytype:"address";},{readonlyindexed:true;readonlyname:"newOwner";readonlytype:"address";},];readonlyname:"OwnerUpdated";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

