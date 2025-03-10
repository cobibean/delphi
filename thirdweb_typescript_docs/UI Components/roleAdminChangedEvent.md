# roleAdminChangedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/permissions/roleAdminChangedEvent](https://portal.thirdweb.com/references/typescript/v5/permissions/roleAdminChangedEvent)*

* References
* roleAdminChangedEvent

Creates an event object for the RoleAdminChanged event.

## Example

`import{ getContractEvents }from"thirdweb";import{ roleAdminChangedEvent }from"thirdweb/extensions/permissions";constevents=awaitgetContractEvents({contract,events: [roleAdminChangedEvent({role:...,previousAdminRole:...,newAdminRole:...,})],});`
#### Signature

`functionroleAdminChangedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"role";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"previousAdminRole";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"newAdminRole";readonlytype:"bytes32";},];readonlyname:"RoleAdminChanged";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"role";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"previousAdminRole";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"newAdminRole";readonlytype:"bytes32";},];readonlyname:"RoleAdminChanged";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

