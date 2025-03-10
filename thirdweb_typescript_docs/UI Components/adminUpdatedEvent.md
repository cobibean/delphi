# adminUpdatedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/adminUpdatedEvent](https://portal.thirdweb.com/references/typescript/v5/erc4337/adminUpdatedEvent)*

* References
* adminUpdatedEvent

Creates an event object for the AdminUpdated event.

## Example

`import{ getContractEvents }from"thirdweb";import{ adminUpdatedEvent }from"thirdweb/extensions/erc4337";constevents=awaitgetContractEvents({contract,events: [adminUpdatedEvent({signer:...,})],});`
#### Signature

`functionadminUpdatedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"signer";readonlytype:"address";},{readonlyname:"isAdmin";readonlytype:"bool"},];readonlyname:"AdminUpdated";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"signer";readonlytype:"address";},{readonlyname:"isAdmin";readonlytype:"bool"},];readonlyname:"AdminUpdated";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

