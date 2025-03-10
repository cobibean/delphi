# getRoyaltyInfoForToken

*Source: [https://portal.thirdweb.com/references/typescript/v5/royaltyerc721/getRoyaltyInfoForToken](https://portal.thirdweb.com/references/typescript/v5/royaltyerc721/getRoyaltyInfoForToken)*

* References
* getRoyaltyInfoForToken

Calls the "getRoyaltyInfoForToken" function on the contract.

## Example

`import{ RoyaltyERC721 }from"thirdweb/modules";constresult=awaitRoyaltyERC721.getRoyaltyInfoForToken({contract,tokenId:...,});`
#### Signature

`functiongetRoyaltyInfoForToken(options:BaseTransactionOptions<GetRoyaltyInfoForTokenParams>,):Promise<readonly[string,number]>;`
## Parameters

#### options

The options for the getRoyaltyInfoForToken function.

### Type

`letoptions:BaseTransactionOptions<GetRoyaltyInfoForTokenParams>;`
## Returns

#### Return Type

`letreturnType:Promise<readonly[string,number]>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

