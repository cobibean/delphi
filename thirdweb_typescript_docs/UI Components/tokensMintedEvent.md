# tokensMintedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/tokensMintedEvent](https://portal.thirdweb.com/references/typescript/v5/erc20/tokensMintedEvent)*

* References
* tokensMintedEvent

Creates an event object for the TokensMinted event.

## Example

`import{ getContractEvents }from"thirdweb";import{ tokensMintedEvent }from"thirdweb/extensions/erc20";constevents=awaitgetContractEvents({contract,events: [tokensMintedEvent({mintedTo:...,})],});`
#### Signature

`functiontokensMintedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"mintedTo";readonlytype:"address";},{readonlyname:"quantityMinted";readonlytype:"uint256"},];readonlyname:"TokensMinted";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"mintedTo";readonlytype:"address";},{readonlyname:"quantityMinted";readonlytype:"uint256"},];readonlyname:"TokensMinted";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

