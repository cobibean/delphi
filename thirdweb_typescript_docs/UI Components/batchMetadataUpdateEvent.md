# batchMetadataUpdateEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/openeditionmetadataerc721/batchMetadataUpdateEvent](https://portal.thirdweb.com/references/typescript/v5/openeditionmetadataerc721/batchMetadataUpdateEvent)*

* References
* batchMetadataUpdateEvent

Creates an event object for the BatchMetadataUpdate event.

## Example

`import{ getContractEvents }from"thirdweb";import{ OpenEditionMetadataERC721 }from"thirdweb/modules";constevents=awaitgetContractEvents({contract,events: [OpenEditionMetadataERC721.batchMetadataUpdateEvent()],});`
#### Signature

`functionbatchMetadataUpdateEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"_fromTokenId";readonlytype:"uint256"},{readonlyname:"_toTokenId";readonlytype:"uint256"},];readonlyname:"BatchMetadataUpdate";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"_fromTokenId";readonlytype:"uint256"},{readonlyname:"_toTokenId";readonlytype:"uint256"},];readonlyname:"BatchMetadataUpdate";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

