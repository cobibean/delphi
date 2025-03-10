# computePublishedContractAddress

*Source: [https://portal.thirdweb.com/references/typescript/v5/deploy/computePublishedContractAddress](https://portal.thirdweb.com/references/typescript/v5/deploy/computePublishedContractAddress)*

* References
* computePublishedContractAddress

Predicts the implementation address of any published contract

## Example

`import{ computePublishedContractAddress }from"thirdweb/deploys";constaddress=awaitcomputePublishedContractAddress({client,chain,contractId:"AccountFactory",constructorParams,});`
#### Signature

`functioncomputePublishedContractAddress(args:{chain:Readonly;client:ThirdwebClient;constructorParams?:Record<string,unknown>;contractId:string;publisher?:string;salt?:string;version?:string;}):Promise<string>;`
## Parameters

#### args

The arguments for predicting the address of a published contract.

### Type

`letargs:{chain:Readonly;client:ThirdwebClient;constructorParams?:Record<string,unknown>;contractId:string;publisher?:string;salt?:string;version?:string;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`A promise that resolves to the predicted address of the contract.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

