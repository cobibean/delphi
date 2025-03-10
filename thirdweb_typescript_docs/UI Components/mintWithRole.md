# mintWithRole

*Source: [https://portal.thirdweb.com/references/typescript/v5/mintableerc721/mintWithRole](https://portal.thirdweb.com/references/typescript/v5/mintableerc721/mintWithRole)*

* References
* mintWithRole

Mints ERC721 tokens to a specified address via a MintableERC721 module.

## Example

`import{ MintableERC721 }from"thirdweb/modules";consttransaction=MintableERC721.mintWithRole({contract,to:"0x...",// Address to mint tokens tonfts: [{name:"My NFT",description:"This is my NFT",image:"ipfs://...",},],});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionmintWithRole(options:BaseTransactionOptions<NFTMintParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for minting tokens.

### Type

`letoptions:BaseTransactionOptions<NFTMintParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction to mint tokens.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

