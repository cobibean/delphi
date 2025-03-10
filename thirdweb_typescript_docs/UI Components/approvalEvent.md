# approvalEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/approvalEvent](https://portal.thirdweb.com/references/typescript/v5/erc20/approvalEvent)*

* References
* approvalEvent

Creates an event object for the Approval event.

## Example

`import{ getContractEvents }from"thirdweb";import{ approvalEvent }from"thirdweb/extensions/erc20";constevents=awaitgetContractEvents({contract,events: [approvalEvent({owner:...,spender:...,})],});`
#### Signature

`functionapprovalEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"owner";readonlytype:"address";},{readonlyindexed:true;readonlyname:"spender";readonlytype:"address";},{readonlyname:"value";readonlytype:"uint256"},];readonlyname:"Approval";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"owner";readonlytype:"address";},{readonlyindexed:true;readonlyname:"spender";readonlytype:"address";},{readonlyname:"value";readonlytype:"uint256"},];readonlyname:"Approval";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

