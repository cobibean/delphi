# getPublishedContractVersions

*Source: [https://portal.thirdweb.com/references/typescript/v5/thirdweb/getPublishedContractVersions](https://portal.thirdweb.com/references/typescript/v5/thirdweb/getPublishedContractVersions)*

* References
* getPublishedContractVersions

Calls the "getPublishedContractVersions" function on the contract.

## Example

`import{ getPublishedContractVersions }from"thirdweb/extensions/thirdweb";constresult=awaitgetPublishedContractVersions({contract,publisher:...,contractId:...,});`
#### Signature

`functiongetPublishedContractVersions(options:BaseTransactionOptions<GetPublishedContractVersionsParams>):Promise<readonlyArray<{bytecodeHash:`0x${string}`;contractId:string;implementation:string;publishMetadataUri:string;publishTimestamp:bigint}>>`
## Parameters

#### options

The options for the getPublishedContractVersions function.

### Type

`letoptions:BaseTransactionOptions<GetPublishedContractVersionsParams>;`
## Returns

#### Return Type

`letreturnType:Promise<readonlyArray<{bytecodeHash:`0x${string}`;contractId:string;implementation:string;publishMetadataUri:string;publishTimestamp:bigint}>>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

