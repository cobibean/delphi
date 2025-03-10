# predictAddress

*Source: [https://portal.thirdweb.com/references/typescript/v5/predictAddress](https://portal.thirdweb.com/references/typescript/v5/predictAddress)*

* References
* predictAddress

UsepredictSmartAccountAddressinstead.

`predictSmartAccountAddress`Predict the address of a smart account.

## Example

`import{ predictAddress }from"thirdweb/wallets/smart";constpredictedAddress=awaitpredictAddress({factoryContract,adminAddress,accountSalt,});`
#### Signature

`functionpredictAddress(args:{accountAddress?:string;accountSalt?:string;adminAddress:string;factoryContract:Readonly;predictAddressOverride?:(factoryContract:Readonly,admin:string,)=>Promise<string>;}):Promise<string>;`
## Parameters

#### args

The options for predicting the address of a smart account.

### Type

`letargs:{accountAddress?:string;accountSalt?:string;adminAddress:string;factoryContract:Readonly;predictAddressOverride?:(factoryContract:Readonly,admin:string,)=>Promise<string>;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The predicted address of the smart account.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

