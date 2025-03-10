# deploySplitContract

*Source: [https://portal.thirdweb.com/typescript/v5/deploy/deploySplitContract](https://portal.thirdweb.com/typescript/v5/deploy/deploySplitContract)*

Deploys a thirdwebSplit contractOn chains where the thirdweb infrastructure contracts are not deployed, this function will deploy them as well.

`Split contract`
## Example

`import{ deploySplitContract }from"thirdweb/deploys";constcontractAddress=awaitdeploySplitContract({chain,client,account,params: {name:"Split contract",payees: ["0x...123","0x...456"],shares: [5100,4900],// See type `SplitContractParams` for more context},});`
#### Signature

`functiondeploySplitContract(options:{account:Account;chain:Readonly;client:ThirdwebClient;params:SplitContractParams;}):Promise<string>;`
## Parameters

#### options

The deployment options.

### Type

`letoptions:{account:Account;chain:Readonly;client:ThirdwebClient;params:SplitContractParams;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The deployed contract address.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

