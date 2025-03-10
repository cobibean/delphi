# prepareDeterministicDeployTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/deploy/prepareDeterministicDeployTransaction](https://portal.thirdweb.com/references/typescript/v5/deploy/prepareDeterministicDeployTransaction)*

* References
* prepareDeterministicDeployTransaction

Deploy a contract deterministically - will maintain the same address across chains.
This is meant to be used with published contracts configured with the 'direct deploy' method.
Under the hood, this uses a keyless transaction with a common create2 factory.

## Example

`import{ prepareDeterministicDeployTransaction }from"thirdweb/deploys";import{ sepolia }from"thirdweb/chains";consttx=prepareDeterministicDeployTransaction({client,chain: sepolia,contractId:"AccountFactory",constructorParams: [123],});`
#### Signature

`functionprepareDeterministicDeployTransaction(options:{chain:Readonly;client:ThirdwebClient;constructorParams?:Record<string,unknown>;contractId:string;publisher?:string;salt?:string;version?:string;}):PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

the options to deploy the contract

### Type

`letoptions:{chain:Readonly;client:ThirdwebClient;constructorParams?:Record<string,unknown>;contractId:string;publisher?:string;salt?:string;version?:string;};`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`
* the transaction to deploy the contract

the transaction to deploy the contract

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

