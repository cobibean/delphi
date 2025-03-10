# roleRevokedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/roleRevokedEvent](https://portal.thirdweb.com/references/typescript/v5/permissions/roleRevokedEvent)*

* References
* roleRevokedEvent

Creates an event object for the RoleRevoked event.

## Example

`import{ getContractEvents }from"thirdweb";import{ roleRevokedEvent }from"thirdweb/extensions/permissions";constevents=awaitgetContractEvents({contract,events: [roleRevokedEvent({role:...,account:...,sender:...,})],});`
#### Signature

`functionroleRevokedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"role";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"account";readonlytype:"address";},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},];readonlyname:"RoleRevoked";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"role";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"account";readonlytype:"address";},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},];readonlyname:"RoleRevoked";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

