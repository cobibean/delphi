# createUnsignedUserOp

*Source: [https://portal.thirdweb.com/references/typescript/v5/createUnsignedUserOp](https://portal.thirdweb.com/references/typescript/v5/createUnsignedUserOp)*

* References
* createUnsignedUserOp

Creates an unsigned user operation from a prepared transaction.

## Example

`import{ createUnsignedUserOp }from"thirdweb/wallets/smart";consttransaction=prepareContractCall(...);constuserOp=awaitcreateUnsignedUserOp({transaction,factoryContract,accountContract,adminAddress,sponsorGas,overrides,});`
#### Signature

`functioncreateUnsignedUserOp(args:{accountContract:Readonly;adminAddress:string;factoryContract:Readonly;isDeployedOverride?:boolean;overrides?:{accountAddress?:string;accountSalt?:string;bundlerUrl?:string;createAccount?:(factoryContract:Readonly,admin:string,)=>PreparedTransaction;entrypointAddress?:string;execute?:(accountContract:Readonly,transaction:SendTransactionOption,)=>PreparedTransaction;executeBatch?:(accountContract:Readonly,transactions:Array<SendTransactionOption>,)=>PreparedTransaction;getAccountNonce?:(accountContract:Readonly)=>Promise<bigint>;paymaster?:(userOp:UserOperationV06|UserOperationV07,)=>Promise<PaymasterResult>;predictAddress?:(factoryContract:Readonly,admin:string,)=>Promise<string>;signMessage?:(options:{accountContract:Readonly;adminAccount:Account;factoryContract:Readonly;message:SignableMessage;})=>Promise<`0x${string}`>;signTypedData?:(options:{accountContract:Readonly;adminAccount:Account;factoryContract:Readonly;typedData:Definition<typedData,primaryType>;})=>Promise<`0x${string}`>;tokenPaymaster?:TokenPaymasterConfig;};sponsorGas:boolean;transaction:PreparedTransaction;waitForDeployment?:boolean;}):Promise<UserOperationV06|UserOperationV07>;`
## Parameters

#### args

The prepared transaction and options

### Type

`letargs:{accountContract:Readonly;adminAddress:string;factoryContract:Readonly;isDeployedOverride?:boolean;overrides?:{accountAddress?:string;accountSalt?:string;bundlerUrl?:string;createAccount?:(factoryContract:Readonly,admin:string,)=>PreparedTransaction;entrypointAddress?:string;execute?:(accountContract:Readonly,transaction:SendTransactionOption,)=>PreparedTransaction;executeBatch?:(accountContract:Readonly,transactions:Array<SendTransactionOption>,)=>PreparedTransaction;getAccountNonce?:(accountContract:Readonly)=>Promise<bigint>;paymaster?:(userOp:UserOperationV06|UserOperationV07,)=>Promise<PaymasterResult>;predictAddress?:(factoryContract:Readonly,admin:string,)=>Promise<string>;signMessage?:(options:{accountContract:Readonly;adminAccount:Account;factoryContract:Readonly;message:SignableMessage;})=>Promise<`0x${string}`>;signTypedData?:(options:{accountContract:Readonly;adminAccount:Account;factoryContract:Readonly;typedData:Definition<typedData,primaryType>;})=>Promise<`0x${string}`>;tokenPaymaster?:TokenPaymasterConfig;};sponsorGas:boolean;transaction:PreparedTransaction;waitForDeployment?:boolean;};`
## Returns

#### Return Type

`letreturnType:Promise<UserOperationV06|UserOperationV07>;`
* The unsigned user operation

The unsigned user operation

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

