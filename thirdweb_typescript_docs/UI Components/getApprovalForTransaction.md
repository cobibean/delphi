# getApprovalForTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/getApprovalForTransaction](https://portal.thirdweb.com/references/typescript/v5/getApprovalForTransaction)*

* References
* getApprovalForTransaction

When dealing with transactions that involve ERC20 tokens (Airdropping ERC20, buy NFTs with ERC20, etc.)
you often have to do a pre-check to see if the targeted contract has the sufficient allowance to "take" the ERC20 tokens from the caller's wallet.

This extension is a handy method that checks for the allowance and requests to approve for more if current allowance is insufficient

## Example

`import{ getApprovalForTransaction }from"thirdweb/extensions/erc20";import{ sendAndConfirmTransaction }from"thirdweb";asyncfunctionbuyNFT() {constbuyTransaction=...// could be a marketplacev3's buyFromListing// Check if you need to approve spending for the involved ERC20 contractconstapproveTx=awaitgetApprovalForTransaction({transaction: buyTransaction,account,// the connected account});if(approveTx) {awaitsendAndConfirmTransaction({transaction: approveTx,account,})}// Once approved, you can finally perform the buy transactionawaitsendAndConfirmTransaction({transaction: buyTransaction,account,});}`
#### Signature

`functiongetApprovalForTransaction(options:GetApprovalForTransactionParams,):Promise<null|PreparedTransaction>;`
## Parameters

#### options

GetApprovalForTransactionParams

### Type

`letoptions:{account:Account;transaction:PreparedTransaction};`
## Returns

#### Return Type

`letreturnType:Readonly<options>&{__contract?:ThirdwebContract<abi>;__preparedMethod?:()=>Promise<PreparedMethod<abiFn>>;};`a PreparedTransaction

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

