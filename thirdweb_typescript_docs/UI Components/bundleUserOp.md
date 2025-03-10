# bundleUserOp

*Source: [https://portal.thirdweb.com/references/typescript/v5/bundleUserOp](https://portal.thirdweb.com/references/typescript/v5/bundleUserOp)*

* References
* bundleUserOp

Bundle a user operation.

## Example

`import{ bundleUserOp }from"thirdweb/wallets/smart";constuserOpHash=awaitbundleUserOp({userOp,options,});`
#### Signature

`functionbundleUserOp(args:{options:BundlerOptions;userOp:UserOperationV06|UserOperationV07;}):Promise<`0x${string}`>;`
## Parameters

#### args

The options for bundling a user operation.

### Type

`letargs:{options:BundlerOptions;userOp:UserOperationV06|UserOperationV07;};`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`The bundle hash of the user operation.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

