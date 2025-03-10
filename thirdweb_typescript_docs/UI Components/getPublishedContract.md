# getPublishedContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/thirdweb/getPublishedContract](https://portal.thirdweb.com/references/typescript/v5/thirdweb/getPublishedContract)*

* References
* getPublishedContract

Calls the "getPublishedContract" function on the contract.

## Example

`import{ getPublishedContract }from"thirdweb/extensions/thirdweb";constresult=awaitgetPublishedContract({contract,publisher:...,contractId:...,});`
#### Signature

`functiongetPublishedContract(options:BaseTransactionOptions<GetPublishedContractParams>,):Promise<{bytecodeHash:`0x${string}`;contractId:string;implementation:string;publishMetadataUri:string;publishTimestamp:bigint;}>;`
## Parameters

#### options

The options for the getPublishedContract function.

### Type

`letoptions:BaseTransactionOptions<GetPublishedContractParams>;`
## Returns

#### Return Type

`letreturnType:Promise<{bytecodeHash:`0x${string}`;contractId:string;implementation:string;publishMetadataUri:string;publishTimestamp:bigint;}>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

