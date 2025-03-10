# accountDeployedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/accountDeployedEvent](https://portal.thirdweb.com/references/typescript/v5/erc4337/accountDeployedEvent)*

* References
* accountDeployedEvent

Creates an event object for the AccountDeployed event.

## Example

`import{ getContractEvents }from"thirdweb";import{ accountDeployedEvent }from"thirdweb/extensions/erc4337";constevents=awaitgetContractEvents({contract,events: [accountDeployedEvent({userOpHash:...,sender:...,})],});`
#### Signature

`functionaccountDeployedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"userOpHash";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},{readonlyname:"factory";readonlytype:"address"},{readonlyname:"paymaster";readonlytype:"address"},];readonlyname:"AccountDeployed";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"userOpHash";readonlytype:"bytes32";},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},{readonlyname:"factory";readonlytype:"address"},{readonlyname:"paymaster";readonlytype:"address"},];readonlyname:"AccountDeployed";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

