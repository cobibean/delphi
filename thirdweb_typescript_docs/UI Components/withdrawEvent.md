# withdrawEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4626/withdrawEvent](https://portal.thirdweb.com/references/typescript/v5/erc4626/withdrawEvent)*

* References
* withdrawEvent

Creates an event object for the Withdraw event.

## Example

`import{ getContractEvents }from"thirdweb";import{ withdrawEvent }from"thirdweb/extensions/erc4626";constevents=awaitgetContractEvents({contract,events: [withdrawEvent({caller:...,receiver:...,owner:...,})],});`
#### Signature

`functionwithdrawEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"caller";readonlytype:"address";},{readonlyindexed:true;readonlyname:"receiver";readonlytype:"address";},{readonlyindexed:true;readonlyname:"owner";readonlytype:"address";},{readonlyname:"assets";readonlytype:"uint256"},{readonlyname:"shares";readonlytype:"uint256"},];readonlyname:"Withdraw";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"caller";readonlytype:"address";},{readonlyindexed:true;readonlyname:"receiver";readonlytype:"address";},{readonlyindexed:true;readonlyname:"owner";readonlytype:"address";},{readonlyname:"assets";readonlytype:"uint256"},{readonlyname:"shares";readonlytype:"uint256"},];readonlyname:"Withdraw";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

