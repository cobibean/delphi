# useSimulateTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/useSimulateTransaction](https://portal.thirdweb.com/references/typescript/v5/useSimulateTransaction)*

* References
* useSimulateTransaction

A hook to simulate a transaction.

## Example

`import{ useSimulateTransaction }from"thirdweb/react";const{mutate:simulateTx}=useSimulateTransaction();// laterconstresult=awaitsimulateTx(tx);`
#### Signature

`functionuseSimulateTransaction():UseMutationResult<any,Error,SimulateOptions<abi,abiFn>>;`
## Returns

#### Return Type

`letreturnType:UseMutationResult<any,Error,SimulateOptions<abi,abiFn>>;`A mutation object to simulate a transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

