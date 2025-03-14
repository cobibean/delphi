# Transfering (sending) tokens using thirdweb extensions

*Source: [https://portal.thirdweb.com/typescript/v5/extensions/examples/transfering-tokens](https://portal.thirdweb.com/typescript/v5/extensions/examples/transfering-tokens)*

## ERC721

```typescript
import { safeTransferFrom } from "thirdweb/extensions/erc721";import { sendAndConfirmTransaction } from "thirdweb"; const transaction = safeTransferFrom({  contract, // the erc721 contract  from: "0x-wallet-address-of-owner",  to: "0x-recipient-address",  tokenId: 0n, // bigint - if you want to transfer tokenId #0, enter `0n`}); const transactionReceipt = await sendAndConfirmTransaction({  account, // the account initiating the transaction  transaction,});
```

`import{ safeTransferFrom }from"thirdweb/extensions/erc721";import{ sendAndConfirmTransaction }from"thirdweb";consttransaction=safeTransferFrom({contract,// the erc721 contractfrom:"0x-wallet-address-of-owner",to:"0x-recipient-address",tokenId:0n,// bigint - if you want to transfer tokenId #0, enter `0n`});consttransactionReceipt=awaitsendAndConfirmTransaction({account,// the account initiating the transactiontransaction,});`
## ERC1155

ERC1155 works in a similar way. However you must specify the quantity that you want to transfer, and an optional data parameter.

```typescript
import { safeTransferFrom } from "thirdweb/extensions/erc1155";import { sendAndConfirmTransaction } from "thirdweb"; const quantity = 1n;const optionalData = "0x"; const transaction = safeTransferFrom({  contract, // the erc1155 contract  from: "0x...", // owner's wallet address  to: "0x...", // recipient address  tokenId: 0n,  value: quantity,  data: optionalData,}); const transactionReceipt = await sendAndConfirmTransaction({  account, // the account initiating the transaction  transaction,});
```

`import{ safeTransferFrom }from"thirdweb/extensions/erc1155";import{ sendAndConfirmTransaction }from"thirdweb";constquantity=1n;constoptionalData="0x";consttransaction=safeTransferFrom({contract,// the erc1155 contractfrom:"0x...",// owner's wallet addressto:"0x...",// recipient addresstokenId:0n,value: quantity,data: optionalData,});consttransactionReceipt=awaitsendAndConfirmTransaction({account,// the account initiating the transactiontransaction,});`
## ERC20

```typescript
import { transferFrom } from "thirdweb/extensions/erc20";import { sendAndConfirmTransaction } from "thirdweb"; const transaction = transferFrom({  contract, // the erc20 contract  from: "0x...", // owner's wallet address  to: "0x...", // recipient address  amount: 10n, // sending 10 tokens  // Alternatively, you can use `amountWei` if you prefer to use the value in wei  // amountWei: 10000000000000000000n, // assuming a decimals of 18});
```

`import{ transferFrom }from"thirdweb/extensions/erc20";import{ sendAndConfirmTransaction }from"thirdweb";consttransaction=transferFrom({contract,// the erc20 contractfrom:"0x...",// owner's wallet addressto:"0x...",// recipient addressamount:10n,// sending 10 tokens// Alternatively, you can use `amountWei` if you prefer to use the value in wei// amountWei: 10000000000000000000n, // assuming a decimals of 18});`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

