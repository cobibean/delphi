# tokensClaimedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/tokensClaimedEvent](https://portal.thirdweb.com/references/typescript/v5/erc20/tokensClaimedEvent)*

* References
* tokensClaimedEvent

Creates an event object for the TokensClaimed event.

## Example

`import{ getContractEvents }from"thirdweb";import{ tokensClaimedEvent }from"thirdweb/extensions/erc20";constevents=awaitgetContractEvents({contract,events: [tokensClaimedEvent({claimConditionIndex:...,claimer:...,receiver:...,})],});`
#### Signature

`functiontokensClaimedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"claimConditionIndex";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"claimer";readonlytype:"address";},{readonlyindexed:true;readonlyname:"receiver";readonlytype:"address";},{readonlyname:"quantityClaimed";readonlytype:"uint256"},];readonlyname:"TokensClaimed";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"claimConditionIndex";readonlytype:"uint256";},{readonlyindexed:true;readonlyname:"claimer";readonlytype:"address";},{readonlyindexed:true;readonlyname:"receiver";readonlytype:"address";},{readonlyname:"quantityClaimed";readonlytype:"uint256"},];readonlyname:"TokensClaimed";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

