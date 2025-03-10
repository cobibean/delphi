# poolCreatedEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/poolCreatedEvent](https://portal.thirdweb.com/references/typescript/v5/uniswap/poolCreatedEvent)*

* References
* poolCreatedEvent

Creates an event object for the PoolCreated event.

## Example

`import{ getContractEvents }from"thirdweb";import{ poolCreatedEvent }from"thirdweb/extensions/uniswap";constevents=awaitgetContractEvents({contract,events: [poolCreatedEvent({token0:...,token1:...,sender:...,})],});`
#### Signature

`functionpoolCreatedEvent(filters:Partial,):PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"token0";readonlytype:"address";},{readonlyindexed:true;readonlyname:"token1";readonlytype:"address";},{readonlyname:"fee";readonlytype:"uint24"},{readonlyname:"tickLower";readonlytype:"int24"},{readonlyname:"tickUpper";readonlytype:"int24"},{readonlyname:"liquidity";readonlytype:"uint128"},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},];readonlyname:"PoolCreated";readonlytype:"event";}>;`
## Parameters

#### filters

Optional filters to apply to the event.

### Type

`letfilters:Partial;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<{readonlyinputs:readonly[{readonlyindexed:true;readonlyname:"token0";readonlytype:"address";},{readonlyindexed:true;readonlyname:"token1";readonlytype:"address";},{readonlyname:"fee";readonlytype:"uint24"},{readonlyname:"tickLower";readonlytype:"int24"},{readonlyname:"tickUpper";readonlytype:"int24"},{readonlyname:"liquidity";readonlytype:"uint128"},{readonlyindexed:true;readonlyname:"sender";readonlytype:"address";},];readonlyname:"PoolCreated";readonlytype:"event";}>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

