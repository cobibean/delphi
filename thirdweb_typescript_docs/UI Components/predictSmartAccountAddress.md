# predictSmartAccountAddress

*Source: [https://portal.thirdweb.com/references/typescript/v5/predictSmartAccountAddress](https://portal.thirdweb.com/references/typescript/v5/predictSmartAccountAddress)*

* References
* predictSmartAccountAddress

Predict the address of a smart account.

## Example

`import{ predictSmartAccountAddress }from"thirdweb/wallets/smart";constpredictedAddress=awaitpredictSmartAccountAddress({client,chain,adminAddress,});`
#### Signature

`functionpredictSmartAccountAddress(args:{accountSalt?:string;adminAddress:string;chain:Readonly;client:ThirdwebClient;factoryAddress?:string;}):Promise<string>;`
## Parameters

#### args

The options for predicting the address of a smart account.

### Type

`letargs:{accountSalt?:string;adminAddress:string;chain:Readonly;client:ThirdwebClient;factoryAddress?:string;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The predicted address of the smart account.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

