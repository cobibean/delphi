# feeAmountEnabledEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/feeAmountEnabledEvent](https://portal.thirdweb.com/references/typescript/v5/uniswap/feeAmountEnabledEvent)*

* References
* feeAmountEnabledEvent

Creates an event object for the FeeAmountEnabled event.

## Example

`import{ getContractEvents }from"thirdweb";import{ feeAmountEnabledEvent }from"thirdweb/extensions/uniswap";constevents=awaitgetContractEvents({contract,events: [feeAmountEnabledEvent()],});`
#### Signature

`functionfeeAmountEnabledEvent():PreparedEvent<{readonlyinputs:readonly[{readonlyname:"fee";readonlytype:"uint24"},{readonlyname:"tickSpacing";readonlytype:"int24"},];readonlyname:"FeeAmountEnabled";readonlytype:"event";}>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyname:"fee";readonlytype:"uint24"},{readonlyname:"tickSpacing";readonlytype:"int24"},];readonlyname:"FeeAmountEnabled";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

