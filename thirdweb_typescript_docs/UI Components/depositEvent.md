# depositEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4626/depositEvent](https://portal.thirdweb.com/references/typescript/v5/erc4626/depositEvent)*

* References
* depositEvent

Creates an event object for the Deposit event.

## Example

`import{ getContractEvents }from"thirdweb";import{ depositEvent }from"thirdweb/extensions/erc4626";constevents=awaitgetContractEvents({contract,events: [depositEvent({caller:...,owner:...,})],});`
#### Signature

`functiondepositEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"caller";readonlytype:"address";},{readonlyindexed:true;readonlyname:"owner";readonlytype:"address";},{readonlyname:"assets";readonlytype:"uint256"},{readonlyname:"shares";readonlytype:"uint256"},];readonlyname:"Deposit";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"caller";readonlytype:"address";},{readonlyindexed:true;readonlyname:"owner";readonlytype:"address";},{readonlyname:"assets";readonlytype:"uint256"},{readonlyname:"shares";readonlytype:"uint256"},];readonlyname:"Deposit";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

