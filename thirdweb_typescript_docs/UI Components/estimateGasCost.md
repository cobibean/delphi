# estimateGasCost

*Source: [https://portal.thirdweb.com/references/typescript/v5/estimateGasCost](https://portal.thirdweb.com/references/typescript/v5/estimateGasCost)*

* References
* estimateGasCost

Estimate the gas cost of a transaction in ether and wei.

## Example

`import{ estimateGasCost }from"thirdweb";constgasCost=awaitestimateGasCost({ transaction });`
#### Signature

`functionestimateGasCost(options:EstimateGasOptions,):Promise<EstimateGasCostResult>;`
## Parameters

#### options

### Type

`letoptions:Prettify<{transaction:PreparedTransaction<any> }&(|{account:Account;from?:never}|{account?:never;from?:string|Account})>;`
## Returns

#### Return Type

`letreturnType:{ether:string;wei:bigint};`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

