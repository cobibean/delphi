# prepareDirectDeployTransaction

*Source: [https://portal.thirdweb.com/typescript/v5/deploy/prepareDirectDeployTransaction](https://portal.thirdweb.com/typescript/v5/deploy/prepareDirectDeployTransaction)*

Prepares a direct deploy transaction with ABI.

## Example

`import{ prepareDirectDeployTransaction }from"thirdweb/deploys";import{ ethereum }from"thirdweb/chains";consttx=prepareDirectDeployTransaction({client,chain: ethereum,bytecode:"0x...",constructorAbi: {inputs: [{ type:"uint256", name:"value"}],type:"constructor",},constructorParams: [123],});`
#### Signature

`functionprepareDirectDeployTransaction(options:{abi:Abi;bytecode:`0x${string}`;chain:Readonly;client:ThirdwebClient;constructorParams?:Record<string,unknown>;}):PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for preparing the transaction.

### Type

`letoptions:{abi:Abi;bytecode:`0x${string}`;chain:Readonly;client:ThirdwebClient;constructorParams?:Record<string,unknown>;};`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`
* The prepared transaction.

The prepared transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

