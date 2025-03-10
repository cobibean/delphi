# deployPublishedContract

*Source: [https://portal.thirdweb.com/typescript/v5/deploy/deployPublishedContract](https://portal.thirdweb.com/typescript/v5/deploy/deployPublishedContract)*

Deploy an instance of a published contract on a given chain

## Example

## Deploying a published contract

`import{ deployPublishedContract }from"thirdweb/deploys";constaddress=awaitdeployPublishedContract({client,chain,account,contractId:"MyPublishedContract",contractParams: {param1:"value1",param2:123,},publisher:"0x...",// optional, defaults to the thirdweb deployer});`
## Deploying a published contract deterministically

`import{ deployPublishedContract }from"thirdweb/deploys";constaddress=awaitdeployPublishedContract({client,chain,account,contractId:"MyPublishedContract",contractParams: {param1:"value1",param2:123,},publisher:"0x...",salt:"your-salt",// this will deterministically deploy the contract at the same address on all chains});`
#### Signature

`functiondeployPublishedContract(options:DeployPublishedContractOptions,):Promise<string>;`
## Parameters

#### options

the deploy options

### Type

`letoptions:{account:Account;chain:Chain;client:ThirdwebClient;contractId:string;contractParams?:Record<string,unknown>;implementationConstructorParams?:Record<string,unknown>;publisher?:string;salt?:string;version?:string;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`a promise that resolves to the deployed contract address

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

