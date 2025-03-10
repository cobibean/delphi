# getFollowData

*Source: [https://portal.thirdweb.com/references/typescript/v5/lens/getFollowData](https://portal.thirdweb.com/references/typescript/v5/lens/getFollowData)*

* References
* getFollowData

Calls the "getFollowData" function on the contract.

## Example

`import{ getFollowData }from"thirdweb/extensions/lens";constresult=awaitgetFollowData({contract,followTokenId:...,});`
#### Signature

`functiongetFollowData(options:BaseTransactionOptions<GetFollowDataParams>,):Promise<{followerProfileId:bigint;followTimestamp:number;originalFollowTimestamp:number;profileIdAllowedToRecover:bigint;}>;`
## Parameters

#### options

The options for the getFollowData function.

### Type

`letoptions:BaseTransactionOptions<GetFollowDataParams>;`
## Returns

#### Return Type

`letreturnType:Promise<{followerProfileId:bigint;followTimestamp:number;originalFollowTimestamp:number;profileIdAllowedToRecover:bigint;}>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

