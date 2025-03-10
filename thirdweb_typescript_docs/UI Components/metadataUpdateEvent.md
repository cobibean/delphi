# metadataUpdateEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/metadataUpdateEvent](https://portal.thirdweb.com/references/typescript/v5/erc1155/metadataUpdateEvent)*

* References
* metadataUpdateEvent

Creates an event object for the MetadataUpdate event.

## Example

`import{ getContractEvents }from"thirdweb";import{ metadataUpdateEvent }from"thirdweb/extensions/erc1155";constevents=awaitgetContractEvents({contract,events: [metadataUpdateEvent()],});`
#### Signature

`functionmetadataUpdateEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"_tokenId";readonlytype:"uint256"},];readonlyname:"MetadataUpdate";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"_tokenId";readonlytype:"uint256"},];readonlyname:"MetadataUpdate";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

