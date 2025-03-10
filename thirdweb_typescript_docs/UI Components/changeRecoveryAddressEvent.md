# changeRecoveryAddressEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/changeRecoveryAddressEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/changeRecoveryAddressEvent)*

* References
* changeRecoveryAddressEvent

Creates an event object for the ChangeRecoveryAddress event.

## Example

`import{ getContractEvents }from"thirdweb";import{ changeRecoveryAddressEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [changeRecoveryAddressEvent({id:...,recovery:...,})],});`
#### Signature

`functionchangeRecoveryAddressEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"id";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"recovery";readonlytype:"address";},];readonlyname:"ChangeRecoveryAddress";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"id";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"recovery";readonlytype:"address";},];readonlyname:"ChangeRecoveryAddress";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

