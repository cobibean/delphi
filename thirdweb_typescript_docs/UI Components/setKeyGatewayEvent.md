# setKeyGatewayEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/setKeyGatewayEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/setKeyGatewayEvent)*

* References
* setKeyGatewayEvent

Creates an event object for the SetKeyGateway event.

## Example

`import{ getContractEvents }from"thirdweb";import{ setKeyGatewayEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [setKeyGatewayEvent()],});`
#### Signature

`functionsetKeyGatewayEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldKeyGateway";readonlytype:"address"},{readonlyname:"newKeyGateway";readonlytype:"address"},];readonlyname:"SetKeyGateway";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldKeyGateway";readonlytype:"address"},{readonlyname:"newKeyGateway";readonlytype:"address"},];readonlyname:"SetKeyGateway";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

