# transferEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/transferEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/transferEvent)*

* References
* transferEvent

Creates an event object for the Transfer event.

## Example

`import{ getContractEvents }from"thirdweb";import{ transferEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [transferEvent({from:...,to:...,})],});`
#### Signature

`functiontransferEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"from";readonlytype:"address";},{readonlyindexed:true;readonlyname:"to";readonlytype:"address";},{readonlyname:"id";readonlytype:"uint256"},];readonlyname:"Transfer";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"from";readonlytype:"address";},{readonlyindexed:true;readonlyname:"to";readonlytype:"address";},{readonlyname:"id";readonlytype:"uint256"},];readonlyname:"Transfer";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

