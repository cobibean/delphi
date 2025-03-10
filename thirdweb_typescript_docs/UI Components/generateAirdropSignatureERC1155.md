# generateAirdropSignatureERC1155

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/generateAirdropSignatureERC1155](https://portal.thirdweb.com/references/typescript/v5/airdrop/generateAirdropSignatureERC1155)*

* References
* generateAirdropSignatureERC1155

Generates the req and signature for sending ERC1155 airdrop.

## Example

`import{airdropERC1155WithSignature,generateAirdropSignatureERC1155,}from"thirdweb/extensions/airdrop";// list of recipients, tokenIds and amounts to airdrop for each recipientconstcontents=[{ recipient:"0x...", tokenId:0, amount:10n},{ recipient:"0x...", tokenId:0, amount:15n},{ recipient:"0x...", tokenId:0, amount:20n},];const{req,signature}=awaitgenerateAirdropSignatureERC1155({account,contract,airdropRequest: {tokenAddress:"0x...",// address of the ERC1155 token to airdropcontents,},});consttransaction=airdropERC1155WithSignature({contract,req,signature,});awaitsendTransaction({ transaction, account });`
#### Signature

`functiongenerateAirdropSignatureERC1155(options:GenerateAirdropERC1155SignatureOptions):Promise<{req:{contents:readonlyArray<{amount:bigint;recipient:string;tokenId:bigint}>;expirationTimestamp:bigint;tokenAddress:string;uid:`0x${string}`};signature:`0x${string}`}>`
## Parameters

#### options

The options for the airdrop.

### Type

`letoptions:{account:Account;airdropRequest:GenerateReqInput;contract:ThirdwebContract;};`
## Returns

#### Return Type

`letreturnType:Promise<{req:{contents:readonlyArray<{amount:bigint;recipient:string;tokenId:bigint}>;expirationTimestamp:bigint;tokenAddress:string;uid:`0x${string}`};signature:`0x${string}`}>`A promise that resolves to the req and signature.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

