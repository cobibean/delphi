# ownerChangedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/ownerChangedEvent](https://portal.thirdweb.com/references/typescript/v5/uniswap/ownerChangedEvent)*

* References
* ownerChangedEvent

Creates an event object for the OwnerChanged event.

## Example

`import{ getContractEvents }from"thirdweb";import{ ownerChangedEvent }from"thirdweb/extensions/uniswap";constevents=awaitgetContractEvents({contract,events: [ownerChangedEvent({oldOwner:...,newOwner:...,})],});`
#### Signature

`functionownerChangedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"oldOwner";readonlytype:"address";},{readonlyindexed:true;readonlyname:"newOwner";readonlytype:"address";},];readonlyname:"OwnerChanged";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"oldOwner";readonlytype:"address";},{readonlyindexed:true;readonlyname:"newOwner";readonlytype:"address";},];readonlyname:"OwnerChanged";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

