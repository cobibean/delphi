# getGasPrice

*Source: [https://portal.thirdweb.com/references/typescript/v5/getGasPrice](https://portal.thirdweb.com/references/typescript/v5/getGasPrice)*

* References
* getGasPrice

Retrieves the gas price for a transaction on a specific chain.

## Example

`import{ getGasPrice }from"thirdweb";constgasPrice=awaitgetGasPrice({ client, chain });`
#### Signature

`functiongetGasPrice(options:GetGasPriceOptions):Promise<bigint>;`
## Parameters

#### options

### Type

`letoptions:{chain:Chain;client:ThirdwebClient;percentMultiplier?:number;};`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the gas price as a bigint.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

