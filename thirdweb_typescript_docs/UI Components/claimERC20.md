# claimERC20

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/claimERC20](https://portal.thirdweb.com/references/typescript/v5/airdrop/claimERC20)*

* References
* claimERC20

Claim airdrop of ERC20 tokens for allowlisted addresses. (Pull based airdrop)

## Example

`import{ claimERC20 }from"thirdweb/extensions/airdrop";import{ sendTransaction }from"thirdweb";consttokenAddress="0x...";// Address of airdropped tokens to claimconstrecipient="0x...";// Address of the allowlisted recipientconstclaimTransaction=claimERC20({contract,tokenAddress,recipient,});awaitsendTransaction({ claimTransaction, account });`
#### Signature

`functionclaimERC20(options:BaseTransactionOptions<ClaimERC20Params>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:BaseTransactionOptions<ClaimERC20Params>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the transaction result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

