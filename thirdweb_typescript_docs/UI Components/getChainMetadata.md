# getChainMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/getChainMetadata](https://portal.thirdweb.com/references/typescript/v5/getChainMetadata)*

* References
* getChainMetadata

Retrieves chain data for a given chain.

## Example

`constchain=defineChain({ id:1});constchainData=awaitgetChainMetadata(chain);console.log(chainData);`
#### Signature

`functiongetChainMetadata(chain:Readonly):Promise<ChainMetadata>;`
## Parameters

#### chain

The chain object containing the chain ID.

### Type

`letchain:Readonly;`
## Returns

#### Return Type

`letreturnType:{chain:string;chainId:number;ens?:{registry:string};explorers?:Readonly<Array<ChainExplorer>>;faucets?:readonlyArray<string>;features?:Readonly<Array<{name:string}>>;icon?:Icon;infoURL?:string;name:string;nativeCurrency:{decimals:number;name:string;symbol:string};networkId?:number;parent?:{bridges?:Readonly<Array<{url:string}>>;chain:string;type:string};redFlags?:readonlyArray<string>;rpc:readonlyArray<string>;shortName:string;slip44?:number;slug:string;stackType:string;status?:string;testnet:boolean;title?:string}`A Promise that resolves to the chain data.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

