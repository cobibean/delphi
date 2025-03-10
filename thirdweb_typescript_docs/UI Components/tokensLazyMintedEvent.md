# tokensLazyMintedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/tokensLazyMintedEvent](https://portal.thirdweb.com/references/typescript/v5/erc721/tokensLazyMintedEvent)*

* References
* tokensLazyMintedEvent

Creates an event object for the TokensLazyMinted event.

## Example

`import{ getContractEvents }from"thirdweb";import{ tokensLazyMintedEvent }from"thirdweb/extensions/erc721";constevents=awaitgetContractEvents({contract,events: [tokensLazyMintedEvent({startTokenId:...,})],});`
#### Signature

`functiontokensLazyMintedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"startTokenId";readonlytype:"uint256";},{readonlyname:"endTokenId";readonlytype:"uint256"},{readonlyname:"baseURI";readonlytype:"string"},{readonlyname:"encryptedBaseURI";readonlytype:"bytes"},];readonlyname:"TokensLazyMinted";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"startTokenId";readonlytype:"uint256";},{readonlyname:"endTokenId";readonlytype:"uint256"},{readonlyname:"baseURI";readonlytype:"string"},{readonlyname:"encryptedBaseURI";readonlytype:"bytes"},];readonlyname:"TokensLazyMinted";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

