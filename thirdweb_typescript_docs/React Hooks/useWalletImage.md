# useWalletImage

*Source: [https://portal.thirdweb.com/references/typescript/v5/useWalletImage](https://portal.thirdweb.com/references/typescript/v5/useWalletImage)*

* References
* useWalletImage

Returns the wallet icon for the provided wallet id.

## Example

`import{ useWalletImage }from"thirdweb/react";const{data:walletImage}=useWalletImage("io.metamask");return<imgsrc={walletImage}alt="MetaMask logo"/>;`
#### Signature

`functionuseWalletImage(id:undefined|WalletId,):UseQueryResult<string,Error>;`
## Parameters

#### id

### Type

`letid:undefined|WalletId;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<string,Error>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

