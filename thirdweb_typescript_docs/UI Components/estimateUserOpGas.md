# estimateUserOpGas

*Source: [https://portal.thirdweb.com/references/typescript/v5/estimateUserOpGas](https://portal.thirdweb.com/references/typescript/v5/estimateUserOpGas)*

* References
* estimateUserOpGas

Estimate the gas cost of a user operation.

## Example

`import{ estimateUserOpGas }from"thirdweb/wallets/smart";constgasCost=awaitestimateUserOpGas({userOp,options,});`
#### Signature

`functionestimateUserOpGas(args:{options:BundlerOptions;userOp:UserOperationV06|UserOperationV07;},stateOverrides?:{},):Promise<EstimationResult>;`
## Parameters

#### args

The options for estimating the gas cost of a user operation.

### Type

`letargs:{options:BundlerOptions;userOp:UserOperationV06|UserOperationV07;};`
#### stateOverrides

## Returns

#### Return Type

`letreturnType:Promise<EstimationResult>;`The estimated gas cost of the user operation.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

