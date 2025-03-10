# getOrDeployModule

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/getOrDeployModule](https://portal.thirdweb.com/references/typescript/v5/common/getOrDeployModule)*

* References
* getOrDeployModule

Gets or deploys a module implementation contract.

## Example

`import{ getOrDeployModule }from"thirdweb/modules";constmodule=awaitgetOrDeployModule({client,chain,account,contractId,publisher,});`
#### Signature

`functiongetOrDeployModule(options:{account:Account;chain:Readonly;client:ThirdwebClient;contractId:string;publisher?:string;}):Promise<Readonly<ContractOptions<[],`0x${string}`>>>;`
## Parameters

#### options

The options to use.

### Type

`letoptions:{account:Account;chain:Readonly;client:ThirdwebClient;contractId:string;publisher?:string;};`
## Returns

#### Return Type

`letreturnType:Promise<Readonly<ContractOptions<[],`0x${string}`>>>;`The module.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

