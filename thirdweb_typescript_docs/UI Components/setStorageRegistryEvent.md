# setStorageRegistryEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/setStorageRegistryEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/setStorageRegistryEvent)*

* References
* setStorageRegistryEvent

Creates an event object for the SetStorageRegistry event.

## Example

`import{ getContractEvents }from"thirdweb";import{ setStorageRegistryEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [setStorageRegistryEvent()],});`
#### Signature

`functionsetStorageRegistryEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldStorageRegistry";readonlytype:"address"},{readonlyname:"newStorageRegistry";readonlytype:"address"},];readonlyname:"SetStorageRegistry";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldStorageRegistry";readonlytype:"address"},{readonlyname:"newStorageRegistry";readonlytype:"address"},];readonlyname:"SetStorageRegistry";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

