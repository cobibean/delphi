# deployPackContract

*Source: [https://portal.thirdweb.com/typescript/v5/deploy/deployPackContract](https://portal.thirdweb.com/typescript/v5/deploy/deployPackContract)*

Deploy a thirdweb Pack contract

## Example

`import{ deployPackContract }from"thirdweb/extensions/deploy";constpackAddress=awaitdeployPackContract({account,client,chain,params: {name:"Pack contract name",symbol:"PACK1155",},});`
#### Signature

`functiondeployPackContract(options:{account:Account;chain:Readonly;client:ThirdwebClient;params:PackContractParams;}):Promise<string>;`
## Parameters

#### options

params for deployingPack contract

`Pack contract`
### Type

`letoptions:{account:Account;chain:Readonly;client:ThirdwebClient;params:PackContractParams;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

