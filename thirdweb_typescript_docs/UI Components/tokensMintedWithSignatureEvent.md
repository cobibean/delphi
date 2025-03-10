# tokensMintedWithSignatureEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/tokensMintedWithSignatureEvent](https://portal.thirdweb.com/references/typescript/v5/erc20/tokensMintedWithSignatureEvent)*

* References
* tokensMintedWithSignatureEvent

Creates an event object for the TokensMintedWithSignature event.

## Example

`import{ getContractEvents }from"thirdweb";import{ tokensMintedWithSignatureEvent }from"thirdweb/extensions/erc20";constevents=awaitgetContractEvents({contract,events: [tokensMintedWithSignatureEvent({signer:...,mintedTo:...,})],});`
#### Signature

`functiontokensMintedWithSignatureEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"signer";readonlytype:"address";},{readonlyindexed:true;readonlyname:"mintedTo";readonlytype:"address";},{readonlycomponents:readonly[{readonlyname:"to";readonlytype:"address"},{readonlyname:"primarySaleRecipient";readonlytype:"address";},{readonlyname:"quantity";readonlytype:"uint256"},{readonlyname:"price";readonlytype:"uint256"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"validityStartTimestamp";readonlytype:"uint128";},{readonlyname:"validityEndTimestamp";readonlytype:"uint128";},{readonlyname:"uid";readonlytype:"bytes32"},];readonlyname:"mintRequest";readonlytype:"tuple";},];readonlyname:"TokensMintedWithSignature";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"signer";readonlytype:"address";},{readonlyindexed:true;readonlyname:"mintedTo";readonlytype:"address";},{readonlycomponents:readonly[{readonlyname:"to";readonlytype:"address"},{readonlyname:"primarySaleRecipient";readonlytype:"address";},{readonlyname:"quantity";readonlytype:"uint256"},{readonlyname:"price";readonlytype:"uint256"},{readonlyname:"currency";readonlytype:"address"},{readonlyname:"validityStartTimestamp";readonlytype:"uint128";},{readonlyname:"validityEndTimestamp";readonlytype:"uint128";},{readonlyname:"uid";readonlytype:"bytes32"},];readonlyname:"mintRequest";readonlytype:"tuple";},];readonlyname:"TokensMintedWithSignature";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

