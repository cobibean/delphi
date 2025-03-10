# userOperationRevertReasonEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/userOperationRevertReasonEvent](https://portal.thirdweb.com/references/typescript/v5/erc4337/userOperationRevertReasonEvent)*

* References
* userOperationRevertReasonEvent

Creates an event object for the UserOperationRevertReason event.

## Example

`import{ getContractEvents }from"thirdweb";import{ userOperationRevertReasonEvent }from"thirdweb/extensions/erc4337";constevents=awaitgetContractEvents({contract,events: [userOperationRevertReasonEvent({userOpHash:...,sender:...,})],});`
#### Signature

`functionuserOperationRevertReasonEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"userOpHash";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},{readonlyname:"nonce";readonlytype:"uint256"},{readonlyname:"revertReason";readonlytype:"bytes"},];readonlyname:"UserOperationRevertReason";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"userOpHash";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},{readonlyname:"nonce";readonlytype:"uint256"},{readonlyname:"revertReason";readonlytype:"bytes"},];readonlyname:"UserOperationRevertReason";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

