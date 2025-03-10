# lazyMint

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/lazyMint](https://portal.thirdweb.com/references/typescript/v5/erc721/lazyMint)*

* References
* lazyMint

Lazily mints ERC721 tokens.

## Example

`import{ lazyMint }from"thirdweb/extensions/erc721";import{ sendTransaction }from"thirdweb";consttransaction=lazyMint({contract,nfts: [{name:"My NFT",description:"This is my NFT",image:"https://example.com/image.png",},],});awaitsendTransaction({ transaction, account });`
#### Signature

`functionlazyMint(options:BaseTransactionOptions<LazyMintParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the lazy minting process.

### Type

`letoptions:BaseTransactionOptions<LazyMintParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the prepared contract call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

