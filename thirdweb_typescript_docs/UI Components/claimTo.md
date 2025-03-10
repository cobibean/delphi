# claimTo

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/claimTo](https://portal.thirdweb.com/references/typescript/v5/erc20/claimTo)*

* References
* claimTo

Claim ERC20 NFTs to a specified address

## Example

### Basic usage

`import{ claimTo }from"thirdweb/extensions/erc20";import{ sendTransaction }from"thirdweb";consttransaction=claimTo({contract,to:"0x...",quantity:100n,});awaitsendTransaction({ transaction, account });`
### For Drops with allowlists

You need to specify the claimer address as thefromparam to avoid any issue with the allowlist

`from``consttransaction=claimTo({contract,to:"0x...",quantity:100n,from:"0x...",// address of the one claiming});`
#### Signature

`functionclaimTo(options:BaseTransactionOptions<ClaimToParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the transaction

### Type

`letoptions:BaseTransactionOptions<ClaimToParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves with the submitted transaction hash.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

