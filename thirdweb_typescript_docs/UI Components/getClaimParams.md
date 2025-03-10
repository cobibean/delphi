# getClaimParams

*Source: [https://portal.thirdweb.com/references/typescript/v5/getClaimParams](https://portal.thirdweb.com/references/typescript/v5/getClaimParams)*

* References
* getClaimParams

Get the claim parameters for a given drop

## Example

`import{ getClaimParams }from"thirdweb/utils";constclaimParams=awaitgetClaimParams({contract,to:"0x...",quantity:1n,type:"erc1155",tokenId:0n,});`
#### Signature

`functiongetClaimParams(options:GetClaimParamsOptions,):Promise<{allowlistProof:OverrideProof;currency:string;data:`0x${string}`;overrides:{erc20Value:|undefined|{amountWei:bigint;tokenAddress:string};value:bigint;};pricePerToken:bigint;quantity:bigint;receiver:string;tokenId:undefined|bigint;}>;`
## Parameters

#### options

The options for getting the claim parameters

### Type

`letoptions:{contract:ThirdwebContract;from?:string;quantity:bigint;singlePhaseDrop?:boolean;to:string;}&(|{type:"erc721"}|{tokenDecimals:number;type:"erc20"}|{tokenId:bigint;type:"erc1155"});`
## Returns

#### Return Type

`letreturnType:Promise<{allowlistProof:OverrideProof;currency:string;data:`0x${string}`;overrides:{erc20Value:|undefined|{amountWei:bigint;tokenAddress:string};value:bigint;};pricePerToken:bigint;quantity:bigint;receiver:string;tokenId:undefined|bigint;}>;`The claim parameters

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

