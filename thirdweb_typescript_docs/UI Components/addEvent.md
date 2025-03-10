# addEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/addEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/addEvent)*

* References
* addEvent

Creates an event object for the Add event.

## Example

`import{ getContractEvents }from"thirdweb";import{ addEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [addEvent({fid:...,keyType:...,key:...,})],});`
#### Signature

`functionaddEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"fid";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"keyType";readonlytype:"uint32";},{readonlyindexed:true;readonlyname:"key";readonlytype:"bytes";},{readonlyname:"keyBytes";readonlytype:"bytes"},{readonlyname:"metadataType";readonlytype:"uint8"},{readonlyname:"metadata";readonlytype:"bytes"},];readonlyname:"Add";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"fid";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"keyType";readonlytype:"uint32";},{readonlyindexed:true;readonlyname:"key";readonlytype:"bytes";},{readonlyname:"keyBytes";readonlytype:"bytes"},{readonlyname:"metadataType";readonlytype:"uint8"},{readonlyname:"metadata";readonlytype:"bytes"},];readonlyname:"Add";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

