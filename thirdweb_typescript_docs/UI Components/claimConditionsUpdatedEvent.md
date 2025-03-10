# claimConditionsUpdatedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/claimConditionsUpdatedEvent](https://portal.thirdweb.com/references/typescript/v5/erc20/claimConditionsUpdatedEvent)*

* References
* claimConditionsUpdatedEvent

Creates an event object for the ClaimConditionsUpdated event.

## Example

`import{ getContractEvents }from"thirdweb";import{ claimConditionsUpdatedEvent }from"thirdweb/extensions/erc20";constevents=awaitgetContractEvents({contract,events: [claimConditionsUpdatedEvent()],});`
#### Signature

`functionclaimConditionsUpdatedEvent():PreparedEvent<{readonlyinputs:readonly[{readonlycomponents:readonly[{readonlyname:"startTimestamp";readonlytype:"uint256"},{readonlyname:"maxClaimableSupply";readonlytype:"uint256";},{readonlyname:"supplyClaimed";readonlytype:"uint256"},{readonlyname:"quantityLimitPerWallet";readonlytype:"uint256";},{readonlyname:"merkleRoot";readonlytype:"bytes32"},{readonlyname:"pricePerToken";readonlytype:"uint256"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"metadata";readonlytype:"string"},];readonlyname:"claimConditions";readonlytype:"tuple[]";},{readonlyname:"resetEligibility";readonlytype:"bool"},];readonlyname:"ClaimConditionsUpdated";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlycomponents:readonly[{readonlyname:"startTimestamp";readonlytype:"uint256"},{readonlyname:"maxClaimableSupply";readonlytype:"uint256";},{readonlyname:"supplyClaimed";readonlytype:"uint256"},{readonlyname:"quantityLimitPerWallet";readonlytype:"uint256";},{readonlyname:"merkleRoot";readonlytype:"bytes32"},{readonlyname:"pricePerToken";readonlytype:"uint256"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"metadata";readonlytype:"string"},];readonlyname:"claimConditions";readonlytype:"tuple[]";},{readonlyname:"resetEligibility";readonlytype:"bool"},];readonlyname:"ClaimConditionsUpdated";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

