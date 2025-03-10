# mintWithSignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/mintableerc721/mintWithSignature](https://portal.thirdweb.com/references/typescript/v5/mintableerc721/mintWithSignature)*

* References
* mintWithSignature

Mints ERC721 tokens to a specified address with a signature via a MintableERC721 module.

## Example

`import{ MintableERC721 }from"thirdweb/modules";// generate the payload and signature, this is typically done on the server// requires to be generated with a wallet that has the MINTER_ROLEconst{payload,signature}=awaitMintableERC721.generateMintSignature({account,contract,nfts: [{name:"My NFT",description:"My NFT",image:"https://example.com/image.png",},],mintRequest: {recipient:"0x...",},});// prepare the transaction, this is typically done on the client// can be executed by any walletconsttransaction=MintableERC721.mintWithSignature({contract,payload,signature,});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionmintWithSignature(options:BaseTransactionOptions<{payload:{amount:bigint;baseURI:string;data:`0x${string}`;to:`0x${string}`;};signature:`0x${string}`;}>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for minting tokens.

### Type

`letoptions:BaseTransactionOptions<{payload:{amount:bigint;baseURI:string;data:`0x${string}`;to:`0x${string}`;};signature:`0x${string}`;}>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction to mint tokens.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

