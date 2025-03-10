# deploySmartAccount

*Source: [https://portal.thirdweb.com/references/typescript/v5/deploySmartAccount](https://portal.thirdweb.com/references/typescript/v5/deploySmartAccount)*

* References
* deploySmartAccount

Deployes a smart account via a dummy transaction. If the account is already deployed, this will do nothing.

## Example

`import{ deploySmartAccount }from"thirdweb";constaccount=awaitdeploySmartAccount({smartAccount,chain,client,accountContract,});`
#### Signature

`functiondeploySmartAccount(args:{accountContract:Readonly;chain:Readonly;client:ThirdwebClient;smartAccount:Account;}):Promise<|undefined|{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;}>;`
## Parameters

#### args

Arguments for the deployment.

### Type

`letargs:{accountContract:Readonly;chain:Readonly;client:ThirdwebClient;smartAccount:Account;};`
## Returns

#### Return Type

`letreturnType:Promise<|undefined|{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;}>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

