# signerPermissionsUpdatedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/signerPermissionsUpdatedEvent](https://portal.thirdweb.com/references/typescript/v5/erc4337/signerPermissionsUpdatedEvent)*

* References
* signerPermissionsUpdatedEvent

Creates an event object for the SignerPermissionsUpdated event.

## Example

`import{ getContractEvents }from"thirdweb";import{ signerPermissionsUpdatedEvent }from"thirdweb/extensions/erc4337";constevents=awaitgetContractEvents({contract,events: [signerPermissionsUpdatedEvent({authorizingSigner:...,targetSigner:...,})],});`
#### Signature

`functionsignerPermissionsUpdatedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"authorizingSigner";readonlytype:"address";},{readonlyindexed:true;readonlyname:"targetSigner";readonlytype:"address";},{readonlycomponents:readonly[{readonlyname:"signer";readonlytype:"address"},{readonlyname:"isAdmin";readonlytype:"uint8"},{readonlyname:"approvedTargets";readonlytype:"address[]";},{readonlyname:"nativeTokenLimitPerTransaction";readonlytype:"uint256";},{readonlyname:"permissionStartTimestamp";readonlytype:"uint128";},{readonlyname:"permissionEndTimestamp";readonlytype:"uint128";},{readonlyname:"reqValidityStartTimestamp";readonlytype:"uint128";},{readonlyname:"reqValidityEndTimestamp";readonlytype:"uint128";},{readonlyname:"uid";readonlytype:"bytes32"},];readonlyname:"permissions";readonlytype:"tuple";},];readonlyname:"SignerPermissionsUpdated";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"authorizingSigner";readonlytype:"address";},{readonlyindexed:true;readonlyname:"targetSigner";readonlytype:"address";},{readonlycomponents:readonly[{readonlyname:"signer";readonlytype:"address"},{readonlyname:"isAdmin";readonlytype:"uint8"},{readonlyname:"approvedTargets";readonlytype:"address[]";},{readonlyname:"nativeTokenLimitPerTransaction";readonlytype:"uint256";},{readonlyname:"permissionStartTimestamp";readonlytype:"uint128";},{readonlyname:"permissionEndTimestamp";readonlytype:"uint128";},{readonlyname:"reqValidityStartTimestamp";readonlytype:"uint128";},{readonlyname:"reqValidityEndTimestamp";readonlytype:"uint128";},{readonlyname:"uid";readonlytype:"bytes32"},];readonlyname:"permissions";readonlytype:"tuple";},];readonlyname:"SignerPermissionsUpdated";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

