# deployModularContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/deployModularContract](https://portal.thirdweb.com/references/typescript/v5/common/deployModularContract)*

* References
* deployModularContract

Deploys an thirdweb ERC20 contract of the given type.
On chains where the thirdweb infrastructure contracts are not deployed, this function will deploy them as well.

## Example

`import{ deployModularContract }from"thirdweb/modules";constcontractAddress=awaitdeployModularContract({chain,client,account,core:"ERC20",params: {name:"MyToken",description:"My Token contract",symbol:"MT",},modules: [ClaimableERC721.module({primarySaleRecipient:"0x...",}),RoyaltyERC721.module({royaltyRecipient:"0x...",royaltyBps:500n,}),],});`
#### Signature

`functiondeployModularContract(options:{account:Account;chain:Readonly;client:ThirdwebClient;core:CoreType;modules?:Array<ModuleInstaller>;params:ModularContractParams;publisher?:string;salt?:string;}):Promise<string>;`
## Parameters

#### options

The deployment options.

### Type

`letoptions:{account:Account;chain:Readonly;client:ThirdwebClient;core:CoreType;modules?:Array<ModuleInstaller>;params:ModularContractParams;publisher?:string;salt?:string;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The deployed contract address.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

