# getAllPublishedContracts

*Source: [https://portal.thirdweb.com/references/typescript/v5/thirdweb/getAllPublishedContracts](https://portal.thirdweb.com/references/typescript/v5/thirdweb/getAllPublishedContracts)*

* References
* getAllPublishedContracts

Calls the "getAllPublishedContracts" function on the contract.

## Example

`import{ getAllPublishedContracts }from"thirdweb/extensions/thirdweb";constresult=awaitgetAllPublishedContracts({contract,publisher:...,});`
#### Signature

`functiongetAllPublishedContracts(options:BaseTransactionOptions<GetAllPublishedContractsParams>):Promise<readonlyArray<{bytecodeHash:`0x${string}`;contractId:string;implementation:string;publishMetadataUri:string;publishTimestamp:bigint}>>`
## Parameters

#### options

The options for the getAllPublishedContracts function.

### Type

`letoptions:BaseTransactionOptions<GetAllPublishedContractsParams>;`
## Returns

#### Return Type

`letreturnType:Promise<readonlyArray<{bytecodeHash:`0x${string}`;contractId:string;implementation:string;publishMetadataUri:string;publishTimestamp:bigint}>>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

