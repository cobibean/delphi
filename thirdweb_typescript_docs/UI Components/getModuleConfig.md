# getModuleConfig

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/getModuleConfig](https://portal.thirdweb.com/references/typescript/v5/modules/getModuleConfig)*

* References
* getModuleConfig

Calls the "getModuleConfig" function on the contract.

## Example

`import{ getModuleConfig }from"thirdweb/extensions/modules";constresult=awaitgetModuleConfig({contract,});`
#### Signature

`functiongetModuleConfig(options:BaseTransactionOptions):Promise<{callbackFunctions:readonlyArray<{selector:`0x${string}`}>;fallbackFunctions:readonlyArray<{permissionBits:bigint;selector:`0x${string}`}>;registerInstallationCallback:boolean;requiredInterfaces:readonlyArray<`0x${string}`>;supportedInterfaces:readonlyArray<`0x${string}`> }>`
## Parameters

#### options

The options for the getModuleConfig function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<{callbackFunctions:readonlyArray<{selector:`0x${string}`}>;fallbackFunctions:readonlyArray<{permissionBits:bigint;selector:`0x${string}`}>;registerInstallationCallback:boolean;requiredInterfaces:readonlyArray<`0x${string}`>;supportedInterfaces:readonlyArray<`0x${string}`> }>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

