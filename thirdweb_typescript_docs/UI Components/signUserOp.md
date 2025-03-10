# signUserOp

*Source: [https://portal.thirdweb.com/references/typescript/v5/signUserOp](https://portal.thirdweb.com/references/typescript/v5/signUserOp)*

* References
* signUserOp

Sign a user operation.

## Example

`import{ signUserOp }from"thirdweb/wallets/smart";constuserOp=awaitcreateUnsignedUserOp(...);constsignedUserOp=awaitsignUserOp({client,userOp,chain,adminAccount,});`
#### Signature

`functionsignUserOp(args:{adminAccount:Account;chain:Readonly;client:ThirdwebClient;entrypointAddress?:string;userOp:UserOperationV06|UserOperationV07;}):Promise<UserOperationV06|UserOperationV07>;`
## Parameters

#### args

### Type

`letargs:{adminAccount:Account;chain:Readonly;client:ThirdwebClient;entrypointAddress?:string;userOp:UserOperationV06|UserOperationV07;};`
## Returns

#### Return Type

`letreturnType:Promise<UserOperationV06|UserOperationV07>;`
* The user operation with the signature field populated

The user operation with the signature field populated

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

