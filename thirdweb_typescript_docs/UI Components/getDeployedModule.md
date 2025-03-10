# getDeployedModule

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/getDeployedModule](https://portal.thirdweb.com/references/typescript/v5/common/getDeployedModule)*

* References
* getDeployedModule

Gets a deployed module implementation contract.

## Example

`import{ getDeployedModule }from"thirdweb/modules";constmodule=awaitgetDeployedModule({client,chain,contractId,publisher,});`
#### Signature

`functiongetDeployedModule(options:{chain:Readonly;client:ThirdwebClient;contractId:string;publisher?:string;}):Promise<null|Readonly<ContractOptions<[],`0x${string}`>>>;`
## Parameters

#### options

The options to use.

### Type

`letoptions:{chain:Readonly;client:ThirdwebClient;contractId:string;publisher?:string;};`
## Returns

#### Return Type

`letreturnType:Promise<null|Readonly<ContractOptions<[],`0x${string}`>>>;`The module.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

