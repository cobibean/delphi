# createAndSignUserOp

*Source: [https://portal.thirdweb.com/references/typescript/v5/createAndSignUserOp](https://portal.thirdweb.com/references/typescript/v5/createAndSignUserOp)*

* References
* createAndSignUserOp

Create and sign a user operation.

## Example

`import{ createAndSignUserOp }from"thirdweb/wallets/smart";constuserOp=awaitcreateAndSignUserOp({client,adminAccount,smartWalletOptions,transactions,});`
#### Signature

`functioncreateAndSignUserOp(options:{adminAccount:Account;client:ThirdwebClient;isDeployedOverride?:boolean;smartWalletOptions:SmartWalletOptions;transactions:Array<PreparedTransaction>;waitForDeployment?:boolean;}):Promise<UserOperationV06|UserOperationV07>;`
## Parameters

#### options

The options for creating and signing the user operation

### Type

`letoptions:{adminAccount:Account;client:ThirdwebClient;isDeployedOverride?:boolean;smartWalletOptions:SmartWalletOptions;transactions:Array<PreparedTransaction>;waitForDeployment?:boolean;};`
## Returns

#### Return Type

`letreturnType:Promise<UserOperationV06|UserOperationV07>;`
* The signed user operation

The signed user operation

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

