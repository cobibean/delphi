# deployERC721Contract

*Source: [https://portal.thirdweb.com/typescript/v5/deploy/deployERC721Contract](https://portal.thirdweb.com/typescript/v5/deploy/deployERC721Contract)*

Deploys an thirdweb ERC721 contract of the given type.
On chains where the thirdweb infrastructure contracts are not deployed, this function will deploy them as well.

## Example

`import{ deployERC721Contract }from"thirdweb/deploys";constcontractAddress=awaitdeployERC721Contract({chain,client,account,type:"DropERC721",params: {name:"MyNFT",description:"My NFT contract",symbol:"NFT",});`
#### Signature

`functiondeployERC721Contract(options:{account:Account;chain:Readonly;client:ThirdwebClient;params:ERC721ContractParams;type:ERC721ContractType;}):Promise<string>;`
## Parameters

#### options

The deployment options.

### Type

`letoptions:{account:Account;chain:Readonly;client:ThirdwebClient;params:ERC721ContractParams;type:ERC721ContractType;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The deployed contract address.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

