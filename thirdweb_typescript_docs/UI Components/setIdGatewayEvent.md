# setIdGatewayEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/setIdGatewayEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/setIdGatewayEvent)*

* References
* setIdGatewayEvent

Creates an event object for the SetIdGateway event.

## Example

`import{ getContractEvents }from"thirdweb";import{ setIdGatewayEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [setIdGatewayEvent()],});`
#### Signature

`functionsetIdGatewayEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldIdGateway";readonlytype:"address"},{readonlyname:"newIdGateway";readonlytype:"address"},];readonlyname:"SetIdGateway";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldIdGateway";readonlytype:"address"},{readonlyname:"newIdGateway";readonlytype:"address"},];readonlyname:"SetIdGateway";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

