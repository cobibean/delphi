# userOperationEventEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/userOperationEventEvent](https://portal.thirdweb.com/references/typescript/v5/erc4337/userOperationEventEvent)*

* References
* userOperationEventEvent

Creates an event object for the UserOperationEvent event.

## Example

`import{ getContractEvents }from"thirdweb";import{ userOperationEventEvent }from"thirdweb/extensions/erc4337";constevents=awaitgetContractEvents({contract,events: [userOperationEventEvent({userOpHash:...,sender:...,paymaster:...,})],});`
#### Signature

`functionuserOperationEventEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"userOpHash";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},{readonlyindexed:true;readonlyname:"paymaster";readonlytype:"address";},{readonlyname:"nonce";readonlytype:"uint256"},{readonlyname:"success";readonlytype:"bool"},{readonlyname:"actualGasCost";readonlytype:"uint256"},{readonlyname:"actualGasUsed";readonlytype:"uint256"},];readonlyname:"UserOperationEvent";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"userOpHash";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},{readonlyindexed:true;readonlyname:"paymaster";readonlytype:"address";},{readonlyname:"nonce";readonlytype:"uint256"},{readonlyname:"success";readonlytype:"bool"},{readonlyname:"actualGasCost";readonlytype:"uint256"},{readonlyname:"actualGasUsed";readonlytype:"uint256"},];readonlyname:"UserOperationEvent";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

