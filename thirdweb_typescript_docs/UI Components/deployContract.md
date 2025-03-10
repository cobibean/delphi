# deployContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/deploy/deployContract](https://portal.thirdweb.com/references/typescript/v5/deploy/deployContract)*

* References
* deployContract

Deploy a contract on a given chain

## Example

## Deploying a regular contract from ABI and bytecode

`import{ deployContract }from"thirdweb/deploys";constaddress=awaitdeployContract({client,chain,bytecode:"0x...",abi: contractAbi,constructorParams: {param1:"value1",param2:123,},salt,// optional: salt enables deterministic deploys});`
## Deploying a contract deterministically

`import{ deployContract }from"thirdweb/deploys";constaddress=awaitdeployContract({client,chain,bytecode:"0x...",abi: contractAbi,constructorParams: {param1:"value1",param2:123,},salt,// passing a salt will enable deterministic deploys});`
#### Signature

`functiondeployContract(options:{abi:Abi;bytecode:`0x${string}`;chain:Readonly;client:ThirdwebClient;constructorParams?:Record<string,unknown>;}&{account:Account;salt?:string},):Promise<string>;`
## Parameters

#### options

the deploy options

### Type

`letoptions:{abi:Abi;bytecode:`0x${string}`;chain:Readonly;client:ThirdwebClient;constructorParams?:Record<string,unknown>;}&{account:Account;salt?:string};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`
* a promise that resolves to the deployed contract address

a promise that resolves to the deployed contract address

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

