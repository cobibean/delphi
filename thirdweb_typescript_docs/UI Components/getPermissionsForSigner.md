# getPermissionsForSigner

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/getPermissionsForSigner](https://portal.thirdweb.com/references/typescript/v5/erc4337/getPermissionsForSigner)*

* References
* getPermissionsForSigner

Calls the "getPermissionsForSigner" function on the contract.

## Example

`import{ getPermissionsForSigner }from"thirdweb/extensions/erc4337";constresult=awaitgetPermissionsForSigner({contract,signer:...,});`
#### Signature

`functiongetPermissionsForSigner(options:BaseTransactionOptions<GetPermissionsForSignerParams>):Promise<{approvedTargets:readonlyArray<string>;endTimestamp:bigint;nativeTokenLimitPerTransaction:bigint;signer:string;startTimestamp:bigint}>`
## Parameters

#### options

The options for the getPermissionsForSigner function.

### Type

`letoptions:BaseTransactionOptions<GetPermissionsForSignerParams>;`
## Returns

#### Return Type

`letreturnType:Promise<{approvedTargets:readonlyArray<string>;endTimestamp:bigint;nativeTokenLimitPerTransaction:bigint;signer:string;startTimestamp:bigint}>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

