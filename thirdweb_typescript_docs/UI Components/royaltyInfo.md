# royaltyInfo

*Source: [https://portal.thirdweb.com/references/typescript/v5/royaltyerc721/royaltyInfo](https://portal.thirdweb.com/references/typescript/v5/royaltyerc721/royaltyInfo)*

* References
* royaltyInfo

Calls the "royaltyInfo" function on the contract.

## Example

`import{ RoyaltyERC721 }from"thirdweb/modules";constresult=awaitRoyaltyERC721.royaltyInfo({contract,tokenId:...,salePrice:...,});`
#### Signature

`functionroyaltyInfo(options:BaseTransactionOptions<RoyaltyInfoParams>,):Promise<readonly[string,bigint]>;`
## Parameters

#### options

The options for the royaltyInfo function.

### Type

`letoptions:BaseTransactionOptions<RoyaltyInfoParams>;`
## Returns

#### Return Type

`letreturnType:Promise<readonly[string,bigint]>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

