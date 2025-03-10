# recoverEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/recoverEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/recoverEvent)*

* References
* recoverEvent

Creates an event object for the Recover event.

## Example

`import{ getContractEvents }from"thirdweb";import{ recoverEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [recoverEvent({from:...,to:...,id:...,})],});`
#### Signature

`functionrecoverEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"from";readonlytype:"address";},{readonlyindexed:true;readonlyname:"to";readonlytype:"address";},{readonlyindexed:true;readonlyname:"id";readonlytype:"uint256";},];readonlyname:"Recover";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"from";readonlytype:"address";},{readonlyindexed:true;readonlyname:"to";readonlytype:"address";},{readonlyindexed:true;readonlyname:"id";readonlytype:"uint256";},];readonlyname:"Recover";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

