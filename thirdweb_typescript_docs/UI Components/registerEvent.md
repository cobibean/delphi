# registerEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/registerEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/registerEvent)*

* References
* registerEvent

Creates an event object for the Register event.

## Example

`import{ getContractEvents }from"thirdweb";import{ registerEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [registerEvent({to:...,id:...,})],});`
#### Signature

`functionregisterEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"to";readonlytype:"address";},{readonlyindexed:true;readonlyname:"id";readonlytype:"uint256";},{readonlyname:"recovery";readonlytype:"address"},];readonlyname:"Register";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"to";readonlytype:"address";},{readonlyindexed:true;readonlyname:"id";readonlytype:"uint256";},{readonlyname:"recovery";readonlytype:"address"},];readonlyname:"Register";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

