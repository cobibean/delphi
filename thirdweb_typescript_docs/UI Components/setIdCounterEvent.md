# setIdCounterEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/setIdCounterEvent](https://portal.thirdweb.com/references/typescript/v5/farcaster/setIdCounterEvent)*

* References
* setIdCounterEvent

Creates an event object for the SetIdCounter event.

## Example

`import{ getContractEvents }from"thirdweb";import{ setIdCounterEvent }from"thirdweb/extensions/farcaster";constevents=awaitgetContractEvents({contract,events: [setIdCounterEvent()],});`
#### Signature

`functionsetIdCounterEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldCounter";readonlytype:"uint256"},{readonlyname:"newCounter";readonlytype:"uint256"},];readonlyname:"SetIdCounter";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"oldCounter";readonlytype:"uint256"},{readonlyname:"newCounter";readonlytype:"uint256"},];readonlyname:"SetIdCounter";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

