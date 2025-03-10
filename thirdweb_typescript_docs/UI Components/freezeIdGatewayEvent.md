# freezeIdGatewayEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/freezeIdGatewayEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/freezeIdGatewayEvent)*

* References
* freezeIdGatewayEvent

Creates an event object for the FreezeIdGateway event.

## Example

`import{ getContractEvents }from"thirdweb";import{ freezeIdGatewayEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [freezeIdGatewayEvent()],});`
#### Signature

`functionfreezeIdGatewayEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"idGateway";readonlytype:"address"},];readonlyname:"FreezeIdGateway";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"idGateway";readonlytype:"address"},];readonlyname:"FreezeIdGateway";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

