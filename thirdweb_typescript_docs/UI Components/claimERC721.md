# claimERC721

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/claimERC721](https://portal.thirdweb.com/references/typescript/v5/airdrop/claimERC721)*

* References
* claimERC721

Claim airdrop of ERC721 tokens for allowlisted addresses. (Pull based airdrop)

## Example

`import{ claimERC721 }from"thirdweb/extensions/airdrop";import{ sendTransaction }from"thirdweb";consttokenAddress="0x...";// Address of airdropped tokens to claimconstrecipient="0x...";// Address of the allowlisted recipientconstclaimTransaction=claimERC721({contract,tokenAddress,recipient,});awaitsendTransaction({ claimTransaction, account });`
#### Signature

`functionclaimERC721(options:BaseTransactionOptions<ClaimERC721Params>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:BaseTransactionOptions<ClaimERC721Params>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the transaction result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

