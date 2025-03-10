# fetchPublishedContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/fetchPublishedContract](https://portal.thirdweb.com/references/typescript/v5/fetchPublishedContract)*

* References
* fetchPublishedContract

Fetches the published contract based on the provided options.

## Example

`constpublishedContract=awaitfetchPublishedContract({publisherAddress:"0x1234",contractName:"MyContract",version:"1.0.0",client: client,});`
#### Signature

`functionfetchPublishedContract(options:FetchPublishedContractOptions,):Promise<{bytecodeHash:`0x${string}`;contractId:string;implementation:string;publishMetadataUri:string;publishTimestamp:bigint;}>;`
## Parameters

#### options

The options for fetching the published contract.

### Type

`letoptions:FetchPublishedContractOptions;`
## Returns

#### Return Type

`letreturnType:Promise<{bytecodeHash:`0x${string}`;contractId:string;implementation:string;publishMetadataUri:string;publishTimestamp:bigint;}>;`The published contract.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

