# getPlatformFeeInfo

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/getPlatformFeeInfo](https://portal.thirdweb.com/references/typescript/v5/common/getPlatformFeeInfo)*

* References
* getPlatformFeeInfo

Calls the "getPlatformFeeInfo" function on the contract.

## Example

`import{ getPlatformFeeInfo }from"thirdweb/extensions/common";constresult=awaitgetPlatformFeeInfo({contract,});`
#### Signature

`functiongetPlatformFeeInfo(options:BaseTransactionOptions,):Promise<readonly[string,number]>;`
## Parameters

#### options

The options for the getPlatformFeeInfo function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<readonly[string,number]>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

