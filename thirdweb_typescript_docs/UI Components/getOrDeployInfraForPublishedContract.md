# getOrDeployInfraForPublishedContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/getOrDeployInfraForPublishedContract](https://portal.thirdweb.com/references/typescript/v5/getOrDeployInfraForPublishedContract)*

* References
* getOrDeployInfraForPublishedContract

Gets or deploys the infrastructure contracts needed for a published contract deployment

#### Signature

`functiongetOrDeployInfraForPublishedContract(args:{account:Account;chain:Readonly;client:ThirdwebClient;}&{constructorParams?:Record<string,unknown>;contractId:string;publisher?:string;version?:string;},):Promise<{cloneFactoryContract:Readonly;implementationContract:Readonly;}>;`
## Parameters

#### args

The arguments object

### Type

`letargs:{account:Account;chain:Readonly;client:ThirdwebClient;}&{constructorParams?:Record<string,unknown>;contractId:string;publisher?:string;version?:string;};`
## Returns

#### Return Type

`letreturnType:Promise<{cloneFactoryContract:Readonly;implementationContract:Readonly;}>;`An object containing:

* cloneFactoryContract: The factory contract used for creating clones
* implementationContract: The deployed implementation contract

cloneFactoryContract: The factory contract used for creating clones

implementationContract: The deployed implementation contract

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

