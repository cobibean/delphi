# getUserOpHash

*Source: [https://portal.thirdweb.com/references/typescript/v5/getUserOpHash](https://portal.thirdweb.com/references/typescript/v5/getUserOpHash)*

* References
* getUserOpHash

Get the hash of a user operation.

## Example

`import{ getUserOpHash }from"thirdweb/wallets/smart";constuserOp=awaitcreateUnsignedUserOp(...);constuserOpHash=awaitgetUserOpHash({client,userOp,chain,});`
#### Signature

`functiongetUserOpHash(args:{chain:Readonly;client:ThirdwebClient;entrypointAddress?:string;userOp:UserOperationV06|UserOperationV07;}):Promise<`0x${string}`>;`
## Parameters

#### args

The options for getting the user operation hash

### Type

`letargs:{chain:Readonly;client:ThirdwebClient;entrypointAddress?:string;userOp:UserOperationV06|UserOperationV07;};`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`
* The user operation hash

The user operation hash

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

