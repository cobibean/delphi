# metadataFrozenEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/metadataFrozenEvent](https://portal.thirdweb.com/references/typescript/v5/erc1155/metadataFrozenEvent)*

* References
* metadataFrozenEvent

Creates an event object for the MetadataFrozen event.

## Example

`import{ getContractEvents }from"thirdweb";import{ metadataFrozenEvent }from"thirdweb/extensions/erc1155";constevents=awaitgetContractEvents({contract,events: [metadataFrozenEvent()],});`
#### Signature

`functionmetadataFrozenEvent():PreparedEvent<{readonlyinputs:readonly[];readonlyname:"MetadataFrozen";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[];readonlyname:"MetadataFrozen";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

