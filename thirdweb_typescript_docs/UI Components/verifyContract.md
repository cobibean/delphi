# verifyContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/verifyContract](https://portal.thirdweb.com/references/typescript/v5/verifyContract)*

* References
* verifyContract

Verifies a contract by performing the following steps:

* Resolves the implementation of the contract.
* Extracts the IPFS URI from the contract bytecode.
* Downloads the contract source code from the IPFS URI.
* Fetches the source files from the compiler metadata.
* Compiles the contract source code using the Solidity compiler.
* Fetches the constructor parameters if not provided.
* Sends a request to the contract verification API to verify the contract source code.

Resolves the implementation of the contract.

Extracts the IPFS URI from the contract bytecode.

Downloads the contract source code from the IPFS URI.

Fetches the source files from the compiler metadata.

Compiles the contract source code using the Solidity compiler.

Fetches the constructor parameters if not provided.

Sends a request to the contract verification API to verify the contract source code.

## Example

`import{ getContract }from"thirdweb/contract";import{ verifyContract }from"thirdweb/contract";constcontract=getContract({...});constverificationResult=awaitverifyContract({contract,explorerApiUrl:"https://api.polygonscan.com/api",explorerApiKey:"YOUR_API_KEY",});console.log(verificationResult);`
#### Signature

`functionverifyContract(options:VerifyContractOptions,):Promise<string|Array<string>>;`
## Parameters

#### options

The options for contract verification.

### Type

`letoptions:VerifyContractOptions;`
## Returns

#### Return Type

`letreturnType:Promise<string|Array<string>>;`A promise that resolves to the verification result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

