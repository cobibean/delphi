# setMaxKeysPerFidEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/setMaxKeysPerFidEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/setMaxKeysPerFidEvent)*

* References
* setMaxKeysPerFidEvent

Creates an event object for the SetMaxKeysPerFid event.

## Example

`import{ getContractEvents }from"thirdweb";import{ setMaxKeysPerFidEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [setMaxKeysPerFidEvent()],});`
#### Signature

`functionsetMaxKeysPerFidEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldMax";readonlytype:"uint256"},{readonlyname:"newMax";readonlytype:"uint256"},];readonlyname:"SetMaxKeysPerFid";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldMax";readonlytype:"uint256"},{readonlyname:"newMax";readonlytype:"uint256"},];readonlyname:"SetMaxKeysPerFid";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

