# getInitializeTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/getInitializeTransaction](https://portal.thirdweb.com/references/typescript/v5/getInitializeTransaction)*

* References
* getInitializeTransaction

Prepares the initialization transaction for a contract deployment

#### Signature

`functiongetInitializeTransaction(options:{account:Account;chain:Readonly;client:ThirdwebClient;deployMetadata:FetchDeployMetadataResult;implementationContract:Readonly;initializeParams?:Record<string,unknown>;modules?:Array<{deployMetadata:FetchDeployMetadataResult;initializeParams?:Record<string,unknown>;}>;}):Promise<PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>>;`
## Parameters

#### options

The options for generating the initialize transaction

### Type

`letoptions:{account:Account;chain:Readonly;client:ThirdwebClient;deployMetadata:FetchDeployMetadataResult;implementationContract:Readonly;initializeParams?:Record<string,unknown>;modules?:Array<{deployMetadata:FetchDeployMetadataResult;initializeParams?:Record<string,unknown>;}>;};`
## Returns

#### Return Type

`letreturnType:Readonly<options>&{__contract?:ThirdwebContract<abi>;__preparedMethod?:()=>Promise<PreparedMethod<abiFn>>;};`The prepared transaction for contract initialization

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

