# setPlatformFeeInfo

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/setPlatformFeeInfo](https://portal.thirdweb.com/references/typescript/v5/common/setPlatformFeeInfo)*

* References
* setPlatformFeeInfo

Prepares a transaction to call the "setPlatformFeeInfo" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setPlatformFeeInfo }from"thirdweb/extensions/common";consttransaction=setPlatformFeeInfo({contract,platformFeeRecipient:...,platformFeeBps:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetPlatformFeeInfo(options:BaseTransactionOptions<|SetPlatformFeeInfoParams|{asyncParams:()=>Promise<SetPlatformFeeInfoParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setPlatformFeeInfo" function.

### Type

`letoptions:BaseTransactionOptions<|SetPlatformFeeInfoParams|{asyncParams:()=>Promise<SetPlatformFeeInfoParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

