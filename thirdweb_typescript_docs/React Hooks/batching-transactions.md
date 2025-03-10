# Batching transactions

*Source: [https://portal.thirdweb.com/typescript/v5/account-abstraction/batching-transactions](https://portal.thirdweb.com/typescript/v5/account-abstraction/batching-transactions)*

Batching transactions allows sending multiple transactions in a single user operation. This can be useful to save on fees, reduce number of user confimations or to ensure that multiple transactions are executed atomically.

A typical example is to do an approval and a transfer in a single userOperation. This way, the transfer will only happen if the approval is successful.

```typescript
import { smartWallet } from "thirdweb/wallets";import { sendBatchTransaction } from "thirdweb";import { approve, transferFrom } from "thirdweb/extensions/erc20"; const smartWallet = new smartWallet(config);const smartAccount = await smartWallet.connect({  client,  personalAccount,}); const transactions = [  approve({    contract,    spender: "0x...",    value: 100,  }),  transferFrom({    contract,    from: "0x...",    to: "0x...",    amount: 100,  }),]; await sendBatchTransaction({  transactions,  account: smartAccount,});
```

`import{ smartWallet }from"thirdweb/wallets";import{ sendBatchTransaction }from"thirdweb";import{ approve, transferFrom }from"thirdweb/extensions/erc20";constsmartWallet=newsmartWallet(config);constsmartAccount=awaitsmartWallet.connect({client,personalAccount,});consttransactions=[approve({contract,spender:"0x...",value:100,}),transferFrom({contract,from:"0x...",to:"0x...",amount:100,}),];awaitsendBatchTransaction({transactions,account: smartAccount,});`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

