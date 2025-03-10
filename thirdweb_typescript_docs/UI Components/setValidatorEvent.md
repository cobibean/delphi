# setValidatorEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/setValidatorEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/setValidatorEvent)*

* References
* setValidatorEvent

Creates an event object for the SetValidator event.

## Example

`import{ getContractEvents }from"thirdweb";import{ setValidatorEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [setValidatorEvent()],});`
#### Signature

`functionsetValidatorEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"keyType";readonlytype:"uint32"},{readonlyname:"metadataType";readonlytype:"uint8"},{readonlyname:"oldValidator";readonlytype:"address"},{readonlyname:"newValidator";readonlytype:"address"},];readonlyname:"SetValidator";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"keyType";readonlytype:"uint32"},{readonlyname:"metadataType";readonlytype:"uint8"},{readonlyname:"oldValidator";readonlytype:"address"},{readonlyname:"newValidator";readonlytype:"address"},];readonlyname:"SetValidator";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

