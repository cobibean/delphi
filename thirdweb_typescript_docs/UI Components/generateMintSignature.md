# generateMintSignature

*Source: [https://portal.thirdweb.com/references/typescript/v5/mintableerc721/generateMintSignature](https://portal.thirdweb.com/references/typescript/v5/mintableerc721/generateMintSignature)*

* References
* generateMintSignature

Generates a payload and signature for minting ERC721 tokens via a MintableERC721 module.

## Example

`import{ MintableERC20 }from"thirdweb/modules";// generate the payload and signature, this is typically done on the server// requires to be generated with a wallet that has the MINTER_ROLEconst{payload,signature}=awaitMintableERC721.generateMintSignature({account,contract,nfts: [{name:"My NFT",description:"My NFT",image:"https://example.com/image.png",},],mintRequest: {recipient:"0x...",},});// prepare the transaction, this is typically done on the client// can be executed by any walletconsttransaction=MintableERC20.mintWithSignature({contract,payload,signature,});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiongenerateMintSignature(options:GenerateMintSignatureOptions,):Promise<{payload:{amount:bigint;baseURI:string;data:`0x${string}`;to:`0x${string}`;};signature:`0x${string}`;}>;`
## Parameters

#### options

The options for generating the payload and signature.

### Type

`letoptions:{account:Account;contract:ThirdwebContract;contractType?:"TokenERC1155"|"SignatureMintERC1155";mintRequest:GeneratePayloadInput;};`
## Returns

#### Return Type

`letreturnType:Promise<{payload:{amount:bigint;baseURI:string;data:`0x${string}`;to:`0x${string}`;};signature:`0x${string}`;}>;`The payload and signature.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

