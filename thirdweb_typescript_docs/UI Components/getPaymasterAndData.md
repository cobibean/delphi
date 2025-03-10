# getPaymasterAndData

*Source: [https://portal.thirdweb.com/references/typescript/v5/getPaymasterAndData](https://portal.thirdweb.com/references/typescript/v5/getPaymasterAndData)*

* References
* getPaymasterAndData

Get paymaster and data details for a user operation.

## Example

`import{ getPaymasterAndData }from"thirdweb/wallets/smart";constuserOp=createUnsignedUserOp(...);constpaymasterAndData=awaitgetPaymasterAndData({userOp,client,chain,});`
#### Signature

`functiongetPaymasterAndData(args:{chain:Readonly;client:ThirdwebClient;entrypointAddress?:string;paymasterOverride?:(userOp:UserOperationV06|UserOperationV07,)=>Promise<PaymasterResult>;userOp:UserOperationV06|UserOperationV07;}):Promise<PaymasterResult>;`
## Parameters

#### args

The userOp and options

### Type

`letargs:{chain:Readonly;client:ThirdwebClient;entrypointAddress?:string;paymasterOverride?:(userOp:UserOperationV06|UserOperationV07,)=>Promise<PaymasterResult>;userOp:UserOperationV06|UserOperationV07;};`
## Returns

#### Return Type

`letreturnType:{callGasLimit?:bigint;preVerificationGas?:bigint;verificationGasLimit?:bigint;}&(|{paymasterAndData:string}|{paymaster:string;paymasterData:string;paymasterPostOpGasLimit?:bigint;paymasterVerificationGasLimit?:bigint;});`
* The paymaster and data details for the user operation.

The paymaster and data details for the user operation.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

