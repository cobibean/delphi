# adminResetEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/adminResetEvent-2](https://portal.thirdweb.com/references/typescript/v5/farcaster/adminResetEvent-2)*

* References
* adminResetEvent

Creates an event object for the AdminReset event.

## Example

`import{ getContractEvents }from"thirdweb";import{ adminResetEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [adminResetEvent({fid:...,key:...,})],});`
#### Signature

`functionadminResetEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"fid";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"key";readonlytype:"bytes";},{readonlyname:"keyBytes";readonlytype:"bytes"},];readonlyname:"AdminReset";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"fid";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"key";readonlytype:"bytes";},{readonlyname:"keyBytes";readonlytype:"bytes"},];readonlyname:"AdminReset";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

