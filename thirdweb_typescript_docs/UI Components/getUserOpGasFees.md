# getUserOpGasFees

*Source: [https://portal.thirdweb.com/references/typescript/v5/getUserOpGasFees](https://portal.thirdweb.com/references/typescript/v5/getUserOpGasFees)*

* References
* getUserOpGasFees

Get the gas fees of a user operation.

## Example

`import{ getUserOpGasPrice }from"thirdweb/wallets/smart";constfees=awaitgetUserOpGasPrice({options,});`
#### Signature

`functiongetUserOpGasFees(args:{options:BundlerOptions;}):Promise<GasPriceResult>;`
## Parameters

#### args

The options for getting the gas price of a user operation.

### Type

`letargs:{options:BundlerOptions};`
## Returns

#### Return Type

`letreturnType:Promise<GasPriceResult>;`The gas price of the user operation.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

