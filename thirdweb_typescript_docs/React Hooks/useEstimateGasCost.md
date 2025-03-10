# useEstimateGasCost

*Source: [https://portal.thirdweb.com/references/typescript/v5/useEstimateGasCost](https://portal.thirdweb.com/references/typescript/v5/useEstimateGasCost)*

* References
* useEstimateGasCost

A hook to estimate the gas cost in ether and wei for a given transaction.

## Example

`import{ useEstimateGasCost }from"thirdweb/react";const{mutate:estimateGasCost,data:gasEstimate}=useEstimateGas();// laterconstestimatedGas=awaitestimateGasCost(tx);console.log("gas cost in ether", estimatedGas.ether);`
#### Signature

`functionuseEstimateGasCost():UseMutationResult<EstimateGasCostResult,Error,PreparedTransaction>;`
## Returns

#### Return Type

`letreturnType:UseMutationResult<EstimateGasCostResult,Error,PreparedTransaction>;`A mutation object to estimate gas cost.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

