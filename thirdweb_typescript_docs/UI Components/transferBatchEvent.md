# transferBatchEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/transferBatchEvent](https://portal.thirdweb.com/references/typescript/v5/erc1155/transferBatchEvent)*

* References
* transferBatchEvent

Creates an event object for the TransferBatch event.

## Example

`import{ getContractEvents }from"thirdweb";import{ transferBatchEvent }from"thirdweb/extensions/erc1155";constevents=awaitgetContractEvents({contract,events: [transferBatchEvent({_operator:...,_from:...,_to:...,})],});`
#### Signature

`functiontransferBatchEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"_operator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"_from";readonlytype:"address";},{readonlyindexed:true;readonlyname:"_to";readonlytype:"address";},{readonlyname:"tokenIds";readonlytype:"uint256[]"},{readonlyname:"_values";readonlytype:"uint256[]"},];readonlyname:"TransferBatch";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"_operator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"_from";readonlytype:"address";},{readonlyindexed:true;readonlyname:"_to";readonlytype:"address";},{readonlyname:"tokenIds";readonlytype:"uint256[]"},{readonlyname:"_values";readonlytype:"uint256[]"},];readonlyname:"TransferBatch";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

