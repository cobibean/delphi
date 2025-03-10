# approvalForAllEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/approvalForAllEvent](https://portal.thirdweb.com/references/typescript/v5/erc721/approvalForAllEvent)*

* References
* approvalForAllEvent

Creates an event object for the ApprovalForAll event.

## Example

`import{ getContractEvents }from"thirdweb";import{ approvalForAllEvent }from"thirdweb/extensions/erc721";constevents=awaitgetContractEvents({contract,events: [approvalForAllEvent({owner:...,operator:...,})],});`
#### Signature

`functionapprovalForAllEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"owner";readonlytype:"address";},{readonlyindexed:true;readonlyname:"operator";readonlytype:"address";},{readonlyname:"approved";readonlytype:"bool"},];readonlyname:"ApprovalForAll";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"owner";readonlytype:"address";},{readonlyindexed:true;readonlyname:"operator";readonlytype:"address";},{readonlyname:"approved";readonlytype:"bool"},];readonlyname:"ApprovalForAll";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

