# watchBlockNumber

*Source: [https://portal.thirdweb.com/typescript/v5/watchBlockNumber](https://portal.thirdweb.com/typescript/v5/watchBlockNumber)*

Watches the block number for a specific chain.

## Example

`import{ watchBlockNumber }from"thirdweb";constunwatch=watchBlockNumber({client,chainId,onNewBlockNumber: (blockNumber)=>{// do something with the block number},onError: (err)=>{// do something if getting the block number fails},});// later stop watchingunwatch();`
#### Signature

`functionwatchBlockNumber(opts:WatchBlockNumberOptions):()=>void;`
## Parameters

#### opts

The options for watching the block number.

### Type

`letopts:{chain:Chain;client:ThirdwebClient;latestBlockNumber?:bigint;onError?:(error:Error)=>void;onNewBlockNumber:(blockNumber:bigint)=>void;overPollRatio?:number;};`
## Returns

#### Return Type

`letreturnType:()=>void;`The unwatch function.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

