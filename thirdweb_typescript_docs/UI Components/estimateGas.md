# estimateGas

*Source: [https://portal.thirdweb.com/references/typescript/v5/estimateGas](https://portal.thirdweb.com/references/typescript/v5/estimateGas)*

* References
* estimateGas

Estimates the gas required to execute a transaction. The gas is returned as abigintand in gwei units.

`bigint`
## Example

`import{ estimateGas }from"thirdweb";constgas=awaitestimateGas({transaction,from:"0x...",});`
#### Signature

`functionestimateGas(options:EstimateGasOptions):Promise<bigint>;`
## Parameters

#### options

The options for estimating gas.

### Type

`letoptions:Prettify<{transaction:PreparedTransaction<any> }&(|{account:Account;from?:never}|{account?:never;from?:string|Account})>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the estimated gas as a bigint.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

