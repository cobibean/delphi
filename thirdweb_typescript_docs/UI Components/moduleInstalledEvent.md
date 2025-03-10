# moduleInstalledEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/moduleInstalledEvent](https://portal.thirdweb.com/references/typescript/v5/modules/moduleInstalledEvent)*

* References
* moduleInstalledEvent

Creates an event object for the ModuleInstalled event.

## Example

`import{ getContractEvents }from"thirdweb";import{ moduleInstalledEvent }from"thirdweb/extensions/modules";constevents=awaitgetContractEvents({contract,events: [moduleInstalledEvent()],});`
#### Signature

`functionmoduleInstalledEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"caller";readonlytype:"address"},{readonlyname:"implementation";readonlytype:"address"},{readonlyname:"installedModule";readonlytype:"address"},];readonlyname:"ModuleInstalled";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"caller";readonlytype:"address"},{readonlyname:"implementation";readonlytype:"address"},{readonlyname:"installedModule";readonlytype:"address"},];readonlyname:"ModuleInstalled";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

