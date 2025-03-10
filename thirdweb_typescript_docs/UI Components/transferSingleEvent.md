# transferSingleEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/transferSingleEvent](https://portal.thirdweb.com/references/typescript/v5/erc1155/transferSingleEvent)*

* References
* transferSingleEvent

Creates an event object for the TransferSingle event.

## Example

`import{ getContractEvents }from"thirdweb";import{ transferSingleEvent }from"thirdweb/extensions/erc1155";constevents=awaitgetContractEvents({contract,events: [transferSingleEvent({_operator:...,_from:...,_to:...,})],});`
#### Signature

`functiontransferSingleEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"_operator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"_from";readonlytype:"address";},{readonlyindexed:true;readonlyname:"_to";readonlytype:"address";},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"_value";readonlytype:"uint256"},];readonlyname:"TransferSingle";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"_operator";readonlytype:"address";},{readonlyindexed:true;readonlyname:"_from";readonlytype:"address";},{readonlyindexed:true;readonlyname:"_to";readonlytype:"address";},{readonlyname:"tokenId";readonlytype:"uint256"},{readonlyname:"_value";readonlytype:"uint256"},];readonlyname:"TransferSingle";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

