# tokenURIRevealedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/tokenURIRevealedEvent](https://portal.thirdweb.com/references/typescript/v5/erc721/tokenURIRevealedEvent)*

* References
* tokenURIRevealedEvent

Creates an event object for the TokenURIRevealed event.

## Example

`import{ getContractEvents }from"thirdweb";import{ tokenURIRevealedEvent }from"thirdweb/extensions/erc721";constevents=awaitgetContractEvents({contract,events: [tokenURIRevealedEvent({index:...,})],});`
#### Signature

`functiontokenURIRevealedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"index";readonlytype:"uint256";},{readonlyname:"revealedURI";readonlytype:"string"},];readonlyname:"TokenURIRevealed";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"index";readonlytype:"uint256";},{readonlyname:"revealedURI";readonlytype:"string"},];readonlyname:"TokenURIRevealed";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

