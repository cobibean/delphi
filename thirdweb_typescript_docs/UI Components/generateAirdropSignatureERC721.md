# generateAirdropSignatureERC721

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/generateAirdropSignatureERC721](https://portal.thirdweb.com/references/typescript/v5/airdrop/generateAirdropSignatureERC721)*

* References
* generateAirdropSignatureERC721

Generates the req and signature for sending ERC721 airdrop.

## Example

`import{airdropERC721WithSignature,generateAirdropSignatureERC721,}from"thirdweb/extensions/airdrop";// list of recipients and tokenIds to airdrop for each recipientconstcontents=[{ recipient:"0x...", tokenId:0},{ recipient:"0x...", tokenId:1},{ recipient:"0x...", tokenId:2},];const{req,signature}=awaitgenerateAirdropSignatureERC721({account,contract,airdropRequest: {tokenAddress:"0x...",// address of the ERC721 token to airdropcontents,},});consttransaction=airdropERC721WithSignature({contract,req,signature,});awaitsendTransaction({ transaction, account });`
#### Signature

`functiongenerateAirdropSignatureERC721(options:GenerateAirdropERC721SignatureOptions):Promise<{req:{contents:readonlyArray<{recipient:string;tokenId:bigint}>;expirationTimestamp:bigint;tokenAddress:string;uid:`0x${string}`};signature:`0x${string}`}>`
## Parameters

#### options

The options for the airdrop.

### Type

`letoptions:{account:Account;airdropRequest:GenerateReqInput;contract:ThirdwebContract;};`
## Returns

#### Return Type

`letreturnType:Promise<{req:{contents:readonlyArray<{recipient:string;tokenId:bigint}>;expirationTimestamp:bigint;tokenAddress:string;uid:`0x${string}`};signature:`0x${string}`}>`A promise that resolves to the req and signature.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

