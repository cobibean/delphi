# useWalletInfo

*Source: [https://portal.thirdweb.com/references/typescript/v5/useWalletInfo](https://portal.thirdweb.com/references/typescript/v5/useWalletInfo)*

* References
* useWalletInfo

Returns the wallet info for the provided wallet id.

## Example

`import{ useWalletInfo }from"thirdweb/react";const{data:walletInfo}=useWalletInfo("io.metamask");console.log("Walelt name", walletInfo?.name);`
#### Signature

`functionuseWalletInfo(id:undefined|WalletId,):UseQueryResult<WalletInfo,Error>;`
## Parameters

#### id

### Type

`letid:undefined|WalletId;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<WalletInfo,Error>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

