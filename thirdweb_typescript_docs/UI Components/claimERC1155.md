# claimERC1155

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/claimERC1155](https://portal.thirdweb.com/references/typescript/v5/airdrop/claimERC1155)*

* References
* claimERC1155

Claim airdrop of ERC1155 tokens for allowlisted addresses. (Pull based airdrop)

## Example

`import{ claimERC1155 }from"thirdweb/extensions/airdrop";import{ sendTransaction }from"thirdweb";consttokenAddress="0x...";// Address of airdropped tokens to claimconstrecipient="0x...";// Address of the allowlisted recipientconstclaimTransaction=claimERC1155({contract,tokenAddress,recipient,});awaitsendTransaction({ claimTransaction, account });`
#### Signature

`functionclaimERC1155(options:BaseTransactionOptions<ClaimERC1155Params>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:BaseTransactionOptions<ClaimERC1155Params>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the transaction result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

