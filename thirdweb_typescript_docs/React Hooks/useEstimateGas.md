# useEstimateGas

*Source: [https://portal.thirdweb.com/references/typescript/v5/useEstimateGas](https://portal.thirdweb.com/references/typescript/v5/useEstimateGas)*

* References
* useEstimateGas

A hook to estimate the gas for a given transaction.

## Example

`import{ useEstimateGas }from"thirdweb/react";const{mutate:estimateGas,data:gasEstimate}=useEstimateGas();// laterconstestimatedGas=awaitestimateGas(tx);`
#### Signature

`functionuseEstimateGas():UseMutationResult<bigint,Error,PreparedTransaction>;`
## Returns

#### Return Type

`letreturnType:UseMutationResult<bigint,Error,PreparedTransaction>;`A mutation object to estimate gas.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

