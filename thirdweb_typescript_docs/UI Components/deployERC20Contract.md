# deployERC20Contract

*Source: [https://portal.thirdweb.com/references/typescript/v5/deploy/deployERC20Contract](https://portal.thirdweb.com/references/typescript/v5/deploy/deployERC20Contract)*

* References
* deployERC20Contract

Deploys an thirdweb ERC20 contract of the given type.
On chains where the thirdweb infrastructure contracts are not deployed, this function will deploy them as well.

## Example

`import{ deployERC20Contract }from"thirdweb/deploys";constcontractAddress=awaitdeployERC20Contract({chain,client,account,type:"TokenERC20",params: {name:"MyToken",description:"My Token contract",symbol:"MT",});`
#### Signature

`functiondeployERC20Contract(options:{account:Account;chain:Readonly;client:ThirdwebClient;params:ERC20ContractParams;publisher?:string;type:ERC20ContractType;}):Promise<string>;`
## Parameters

#### options

The deployment options.

### Type

`letoptions:{account:Account;chain:Readonly;client:ThirdwebClient;params:ERC20ContractParams;publisher?:string;type:ERC20ContractType;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The deployed contract address.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

