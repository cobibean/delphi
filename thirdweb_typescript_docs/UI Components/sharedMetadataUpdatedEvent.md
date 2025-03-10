# sharedMetadataUpdatedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/openeditionmetadataerc721/sharedMetadataUpdatedEvent](https://portal.thirdweb.com/references/typescript/v5/openeditionmetadataerc721/sharedMetadataUpdatedEvent)*

* References
* sharedMetadataUpdatedEvent

Creates an event object for the SharedMetadataUpdated event.

## Example

`import{ getContractEvents }from"thirdweb";import{ OpenEditionMetadataERC721 }from"thirdweb/modules";constevents=awaitgetContractEvents({contract,events: [OpenEditionMetadataERC721.sharedMetadataUpdatedEvent()],});`
#### Signature

`functionsharedMetadataUpdatedEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"name";readonlytype:"string"},{readonlyname:"description";readonlytype:"string"},{readonlyname:"imageURI";readonlytype:"string"},{readonlyname:"animationURI";readonlytype:"string"},];readonlyname:"SharedMetadataUpdated";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"name";readonlytype:"string"},{readonlyname:"description";readonlytype:"string"},{readonlyname:"imageURI";readonlytype:"string"},{readonlyname:"animationURI";readonlytype:"string"},];readonlyname:"SharedMetadataUpdated";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

