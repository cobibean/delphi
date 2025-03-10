# removeEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/removeEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/removeEvent)*

* References
* removeEvent

Creates an event object for the Remove event.

## Example

`import{ getContractEvents }from"thirdweb";import{ removeEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [removeEvent({fid:...,key:...,})],});`
#### Signature

`functionremoveEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"fid";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"key";readonlytype:"bytes";},{readonlyname:"keyBytes";readonlytype:"bytes"},];readonlyname:"Remove";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"fid";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"key";readonlytype:"bytes";},{readonlyname:"keyBytes";readonlytype:"bytes"},];readonlyname:"Remove";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

