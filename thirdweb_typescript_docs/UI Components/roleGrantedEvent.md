# roleGrantedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/roleGrantedEvent](https://portal.thirdweb.com/references/typescript/v5/permissions/roleGrantedEvent)*

* References
* roleGrantedEvent

Creates an event object for the RoleGranted event.

## Example

`import{ getContractEvents }from"thirdweb";import{ roleGrantedEvent }from"thirdweb/extensions/permissions";constevents=awaitgetContractEvents({contract,events: [roleGrantedEvent({role:...,account:...,sender:...,})],});`
#### Signature

`functionroleGrantedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"role";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"account";readonlytype:"address";},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},];readonlyname:"RoleGranted";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"role";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"account";readonlytype:"address";},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},];readonlyname:"RoleGranted";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

