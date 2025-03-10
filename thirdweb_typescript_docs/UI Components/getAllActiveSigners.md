# getAllActiveSigners

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/getAllActiveSigners](https://portal.thirdweb.com/references/typescript/v5/erc4337/getAllActiveSigners)*

* References
* getAllActiveSigners

Calls the "getAllActiveSigners" function on the contract.

## Example

`import{ getAllActiveSigners }from"thirdweb/extensions/erc4337";constresult=awaitgetAllActiveSigners({contract,});`
#### Signature

`functiongetAllActiveSigners(options:BaseTransactionOptions):Promise<readonlyArray<{approvedTargets:readonlyArray<string>;endTimestamp:bigint;nativeTokenLimitPerTransaction:bigint;signer:string;startTimestamp:bigint}>>`
## Parameters

#### options

The options for the getAllActiveSigners function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<readonlyArray<{approvedTargets:readonlyArray<string>;endTimestamp:bigint;nativeTokenLimitPerTransaction:bigint;signer:string;startTimestamp:bigint}>>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

