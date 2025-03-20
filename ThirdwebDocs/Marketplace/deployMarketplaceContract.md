# deployMarketplaceContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/deployMarketplaceContract](https://portal.thirdweb.com/references/typescript/v5/marketplace/deployMarketplaceContract)*

* References
* deployMarketplaceContract

Deploys a marketplace contract.

## Example

`import{ deployMarketplaceContract }from"thirdweb/deploys";constaddress=awaitdeployMarketplaceContract({client,chain,account,params: {name:"MarketplaceV3",description:"MarketplaceV3 deployed using thirdweb SDK",platformFeeRecipient:"0x21d514c90ee4E4e4Cd16Ce9185BF01F0F1eE4A04",platformFeeBps:1000,},});`
#### Signature

`functiondeployMarketplaceContract(options:{account:Account;chain:Readonly;client:ThirdwebClient;params:MarketplaceContractParams;version?:string;}):Promise<string>;`
## Parameters

#### options

The options for deploying the marketplace contract.

### Type

`letoptions:{account:Account;chain:Readonly;client:ThirdwebClient;params:MarketplaceContractParams;version?:string;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

