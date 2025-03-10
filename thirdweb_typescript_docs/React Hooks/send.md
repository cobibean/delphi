# Acting on a prepared transaction

*Source: [https://portal.thirdweb.com/typescript/v5/transactions/send](https://portal.thirdweb.com/typescript/v5/transactions/send)*

Transactions have a variety of actions that can be called on them, in all cases this is done by passing the transaction to the various action functions.

## Sending a transaction

Send the prepared transaction to the blockchain. Sending a transaction requires a wallet.

SeeWalletsfor more information on how to create a wallet.

```typescript
import { sendTransaction } from "thirdweb";import { createWallet } from "thirdweb/wallets"; const wallet = createWallet("io.metamask");const account = await wallet.connect({ client }); const transactionResult = await sendTransaction({  transaction,  account,});
```

`import{ sendTransaction }from"thirdweb";import{ createWallet }from"thirdweb/wallets";constwallet=createWallet("io.metamask");constaccount=awaitwallet.connect({ client });consttransactionResult=awaitsendTransaction({transaction,account,});`
## sendAndConfirmTransaction

Send a transaction and wait for it to be mined. Useful when you want to block until the transaction is fully confirmed onchain before proceeding to the next step.

```typescript
import { sendAndConfirmTransaction } from "thirdweb";import { createWallet } from "thirdweb/wallets"; const wallet = createWallet("io.metamask");const account = await wallet.connect({ client }); const receipt = await sendAndConfirmTransaction({  transaction,  account,});
```

`import{ sendAndConfirmTransaction }from"thirdweb";import{ createWallet }from"thirdweb/wallets";constwallet=createWallet("io.metamask");constaccount=awaitwallet.connect({ client });constreceipt=awaitsendAndConfirmTransaction({transaction,account,});`
## waitForReceipt

Wait for a transaction to be mined and get the transaction receipt.

```typescript
import { sendTransaction, waitForReceipt } from "thirdweb";import { createWallet } from "thirdweb/wallets"; const wallet = createWallet("io.metamask");const account = await wallet.connect({ client }); const transactionResult = await sendTransaction({  transaction,  account,}); const receipt = await waitForReceipt(transactionResult);
```

`import{ sendTransaction, waitForReceipt }from"thirdweb";import{ createWallet }from"thirdweb/wallets";constwallet=createWallet("io.metamask");constaccount=awaitwallet.connect({ client });consttransactionResult=awaitsendTransaction({transaction,account,});constreceipt=awaitwaitForReceipt(transactionResult);`
## estimateGas

Estimating gas used by a transaction

```typescript
import { estimateGas } from "thirdweb"; const gasEstimate = await estimateGas({ transaction });console.log("estmated gas used", gasEstimate);
```

`import{ estimateGas }from"thirdweb";constgasEstimate=awaitestimateGas({ transaction });console.log("estmated gas used", gasEstimate);`
## estimateGasCost

Estimating gas cost in ether and wei for a transaction

```typescript
import { estimateGas } from "thirdweb"; const gasCost = await estimateGasCost({ transaction });console.log("cost in ether", gasCost.ether);
```

`import{ estimateGas }from"thirdweb";constgasCost=awaitestimateGasCost({ transaction });console.log("cost in ether", gasCost.ether);`
## simulateTransaction

Simulate a transaction to see if it would be successful.

```typescript
import { simulateTransaction } from "thirdweb"; const result = await simulateTransaction({ transaction });console.log("simulation result", result);
```

`import{ simulateTransaction }from"thirdweb";constresult=awaitsimulateTransaction({ transaction });console.log("simulation result", result);`
## encode

Encode a transaction data to be used later

```typescript
import { encode } from "thirdweb"; const data = await encode(transaction);console.log("encoded data", data);
```

`import{ encode }from"thirdweb";constdata=awaitencode(transaction);console.log("encoded data", data);`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

