# mint

*Source: [https://portal.thirdweb.com/references/typescript/v5/claimableerc721/mint](https://portal.thirdweb.com/references/typescript/v5/claimableerc721/mint)*

* References
* mint

Mints ERC721 tokens to a specified address via a ClaimableERC721 module.

## Example

`import{ ClaimableERC721 }from"thirdweb/modules";consttransaction=ClaimableERC721.mint({contract,to:"0x...",// Address to mint tokens toquantity:2,// Amount of tokens to mint});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionmint(options:BaseTransactionOptions<MintParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for minting tokens.

### Type

`letoptions:BaseTransactionOptions<MintParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction to mint tokens.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

