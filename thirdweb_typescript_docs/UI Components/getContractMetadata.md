# getContractMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/getContractMetadata](https://portal.thirdweb.com/references/typescript/v5/common/getContractMetadata)*

* References
* getContractMetadata

Retrieves the contract metadata including name and symbol.

## Example

`import{ getContractMetadata }from"thirdweb/extensions/common";constmetadata=awaitgetContractMetadata({ contract });`
#### Signature

`functiongetContractMetadata(options:BaseTransactionOptions,):Promise<{name:string;symbol:string}>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<{name:string;symbol:string}>;`A promise that resolves to an object containing the resolved metadata, name, and symbol.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

