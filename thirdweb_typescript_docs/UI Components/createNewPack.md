# createNewPack

*Source: [https://portal.thirdweb.com/references/typescript/v5/pack/createNewPack](https://portal.thirdweb.com/references/typescript/v5/pack/createNewPack)*

* References
* createNewPack

## Example

`import{ createNewPack }from"thirdweb/extensions/pack";consttransaction=createNewPack({contract: packContract,client,recipient:"0x...",tokenOwner:"0x...",packMetadata: {name:"Pack #1",image:"image-of-pack-1",},openStartTimestamp:newDate(),erc20Rewards: [{contractAddress:"0x...",quantityPerReward:1,totalRewards:1,},],erc721Rewards: [{contractAddress:"0x...",tokenId:0n,},],erc1155Rewards: [{contractAddress:"0x...",tokenId:0n,quantityPerReward:1,totalRewards:1,},],});`
#### Signature

`functioncreateNewPack(options:WithOverrides<BaseTransactionOptions<CreateNewPackParams>>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

### Type

`letoptions:WithOverrides<BaseTransactionOptions<CreateNewPackParams>>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

