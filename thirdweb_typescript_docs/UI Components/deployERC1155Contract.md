# deployERC1155Contract

*Source: [https://portal.thirdweb.com/references/typescript/v5/deploy/deployERC1155Contract](https://portal.thirdweb.com/references/typescript/v5/deploy/deployERC1155Contract)*

* References
* deployERC1155Contract

Deploys an thirdweb ERC1155 contract of the given type.
On chains where the thirdweb infrastructure contracts are not deployed, this function will deploy them as well.

## Example

`import{ deployERC1155Contract }from"thirdweb/deploys";constcontractAddress=awaitdeployERC1155Contract({chain,client,account,type:"DropERC1155",params: {name:"MyEdition",description:"My edition contract",symbol:"ME",});`
#### Signature

`functiondeployERC1155Contract(options:{account:Account;chain:Readonly;client:ThirdwebClient;params:ERC1155ContractParams;type:ERC1155ContractType;}):Promise<string>;`
## Parameters

#### options

The deployment options.

### Type

`letoptions:{account:Account;chain:Readonly;client:ThirdwebClient;params:ERC1155ContractParams;type:ERC1155ContractType;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The deployed contract address.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

