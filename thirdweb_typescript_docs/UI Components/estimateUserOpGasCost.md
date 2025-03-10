# estimateUserOpGasCost

*Source: [https://portal.thirdweb.com/references/typescript/v5/estimateUserOpGasCost](https://portal.thirdweb.com/references/typescript/v5/estimateUserOpGasCost)*

* References
* estimateUserOpGasCost

Estimate the gas cost of a user operation.

## Example

`import{ estimateUserOpGasCost }from"thirdweb/wallets/smart";constgasCost=awaitestimateUserOpGasCost({transactions,adminAccount,client,smartWalletOptions,});`
#### Signature

`functionestimateUserOpGasCost(args:{adminAccount:Account;client:ThirdwebClient;smartWalletOptions:SmartWalletOptions;transactions:Array<PreparedTransaction>;}):Promise<{ether:string;wei:bigint}>;`
## Parameters

#### args

The options for estimating the gas cost of a user operation.

### Type

`letargs:{adminAccount:Account;client:ThirdwebClient;smartWalletOptions:SmartWalletOptions;transactions:Array<PreparedTransaction>;};`
## Returns

#### Return Type

`letreturnType:Promise<{ether:string;wei:bigint}>;`The estimated gas cost of the user operation.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

