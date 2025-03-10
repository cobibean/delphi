# freezeKeyGatewayEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/freezeKeyGatewayEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/freezeKeyGatewayEvent)*

* References
* freezeKeyGatewayEvent

Creates an event object for the FreezeKeyGateway event.

## Example

`import{ getContractEvents }from"thirdweb";import{ freezeKeyGatewayEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [freezeKeyGatewayEvent()],});`
#### Signature

`functionfreezeKeyGatewayEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"keyGateway";readonlytype:"address"},];readonlyname:"FreezeKeyGateway";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"keyGateway";readonlytype:"address"},];readonlyname:"FreezeKeyGateway";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

