# getInstalledModules

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/getInstalledModules](https://portal.thirdweb.com/references/typescript/v5/modules/getInstalledModules)*

* References
* getInstalledModules

Calls the "getInstalledModules" function on the contract.

## Example

`import{ getInstalledModules }from"thirdweb/extensions/modules";constresult=awaitgetInstalledModules({contract,});`
#### Signature

`functiongetInstalledModules(options:BaseTransactionOptions):Promise<readonlyArray<{config:{callbackFunctions:readonlyArray<{selector:`0x${string}`}>;fallbackFunctions:readonlyArray<{permissionBits:bigint;selector:`0x${string}`}>;registerInstallationCallback:boolean;requiredInterfaces:readonlyArray<`0x${string}`>;supportedInterfaces:readonlyArray<`0x${string}`> };implementation:string}>>`
## Parameters

#### options

The options for the getInstalledModules function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<readonlyArray<{config:{callbackFunctions:readonlyArray<{selector:`0x${string}`}>;fallbackFunctions:readonlyArray<{permissionBits:bigint;selector:`0x${string}`}>;registerInstallationCallback:boolean;requiredInterfaces:readonlyArray<`0x${string}`>;supportedInterfaces:readonlyArray<`0x${string}`> };implementation:string}>>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

