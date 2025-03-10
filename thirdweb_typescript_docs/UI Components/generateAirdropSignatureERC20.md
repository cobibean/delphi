# generateAirdropSignatureERC20

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/generateAirdropSignatureERC20](https://portal.thirdweb.com/references/typescript/v5/airdrop/generateAirdropSignatureERC20)*

* References
* generateAirdropSignatureERC20

Generates the req and signature for sending ERC20 airdrop.

## Example

`import{airdropERC20WithSignature,generateAirdropSignatureERC20,}from"thirdweb/extensions/airdrop";// list of recipients and amounts to airdrop for each recipientconstcontents=[{ recipient:"0x...", amount:10n},// amount in wei{ recipient:"0x...", amount:15n},// amount in wei{ recipient:"0x...", amount:20n},// amount in wei];const{req,signature}=awaitgenerateAirdropSignatureERC20({account,contract,airdropRequest: {tokenAddress:"0x...",// address of the ERC20 token to airdropcontents,},});consttransaction=airdropERC20WithSignature({contract,req,signature,});awaitsendTransaction({ transaction, account });`
#### Signature

`functiongenerateAirdropSignatureERC20(options:GenerateAirdropERC20SignatureOptions):Promise<{req:{contents:readonlyArray<{amount:bigint;recipient:string}>;expirationTimestamp:bigint;tokenAddress:string;uid:`0x${string}`};signature:`0x${string}`}>`
## Parameters

#### options

The options for the airdrop.

### Type

`letoptions:{account:Account;airdropRequest:GenerateReqInput;contract:ThirdwebContract;};`
## Returns

#### Return Type

`letreturnType:Promise<{req:{contents:readonlyArray<{amount:bigint;recipient:string}>;expirationTimestamp:bigint;tokenAddress:string;uid:`0x${string}`};signature:`0x${string}`}>`A promise that resolves to the req and signature.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

