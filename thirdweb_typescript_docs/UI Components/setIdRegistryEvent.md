# setIdRegistryEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/setIdRegistryEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/setIdRegistryEvent)*

* References
* setIdRegistryEvent

Creates an event object for the SetIdRegistry event.

## Example

`import{ getContractEvents }from"thirdweb";import{ setIdRegistryEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [setIdRegistryEvent()],});`
#### Signature

`functionsetIdRegistryEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldIdRegistry";readonlytype:"address"},{readonlyname:"newIdRegistry";readonlytype:"address"},];readonlyname:"SetIdRegistry";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldIdRegistry";readonlytype:"address"},{readonlyname:"newIdRegistry";readonlytype:"address"},];readonlyname:"SetIdRegistry";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

