# Account Permissions & Session Keys

*Source: [https://portal.thirdweb.com/typescript/v5/account-abstraction/permissions](https://portal.thirdweb.com/typescript/v5/account-abstraction/permissions)*

All of the account contracts -SimpleandManaged- share the same permission model. In this section, we'll describe this permission model in detail.

An account recognizes only two types of actors:Session KeysandAdmins.

## 1. Admins

Admins haveunrestricted accessto the account; call any functions on the contract, use the contract without going through the ERC-4337 infrastructure (bundlers, EntryPoint, etc.), withdraw the account's native token balance, and so on.

### Assigning Admin Permissions

Existing admins on the account can add new admins, remove existing admins or renounce their own admin status.

```typescript
import { addAdmin } from "thirdweb/extensions/erc4337";import { smartWallet } from "thirdweb/wallets";import { sendTransaction, getContract } from "thirdweb"; const smartWallet = new smartWallet(config);const smartAccount = await smartWallet.connect({  client,  personalAccount,}); const transaction = addAdmin({  contract: getContract({    address: smartAccount.address,    chain,    client,  }),  account: smartAccount,  adminAddress: "0x...", // the address of the new admin});await sendTransaction({  transaction,  account: smartAccount,});
```

`import{ addAdmin }from"thirdweb/extensions/erc4337";import{ smartWallet }from"thirdweb/wallets";import{ sendTransaction, getContract }from"thirdweb";constsmartWallet=newsmartWallet(config);constsmartAccount=awaitsmartWallet.connect({client,personalAccount,});consttransaction=addAdmin({contract:getContract({address: smartAccount.address,chain,client,}),account: smartAccount,adminAddress:"0x...",// the address of the new admin});awaitsendTransaction({transaction,account: smartAccount,});`
## 2. Session Keys

Session Keys are additional authorized signers that must go through ERC-4337 infrastructure (bundlers, EntryPoint, etc.) to use an account to execute transactions. Session keys can use an account under certain restrictions.

### Assigning Session Key Permissions

Each individual session key has its own permissions to use the account. Only admins can set the permissions for session keys.

Session keys can be assigned the following permissions:

* [Required] Allow interaction with specific contracts with the account ("*" for any contracts)
* [Optional] Have a maximum amount of native tokens that can be transferred per transaction (defaults to 0 eth, transactions with value will be rejected)
* [Optional] Have access to the account only during a specific time window (defaults to 10 years from now)

```typescript
import { addAdmin } from "thirdweb/extensions/erc4337";import { smartWallet } from "thirdweb/wallets";import { sendTransaction, getContract } from "thirdweb"; const smartWallet = new smartWallet(config);const smartAccount = await smartWallet.connect({  client,  personalAccount,}); const transaction = addSessionKey({  contract: getContract({    address: smartAccount.address,    chain,    client,  }),  account: smartAccount,  sessionKeyAddress: "0x...", // the address of the new session key  permissions: {    approvedTargets: "*", // the addresses of allowed contracts, or '*' for any contract    nativeTokenLimitPerTransaction: 0.1, // the maximum amount of native token (in ETH) that the session key can spend per transaction    permissionStartTimestamp: new Date(), // the date when the session key becomes active    permissionEndTimestamp: new Date(      Date.now() + 24 * 60 * 60 * 1000,    ), // the date when the session key expires  },});await sendTransaction({  transaction,  account: smartAccount,});
```

`import{ addAdmin }from"thirdweb/extensions/erc4337";import{ smartWallet }from"thirdweb/wallets";import{ sendTransaction, getContract }from"thirdweb";constsmartWallet=newsmartWallet(config);constsmartAccount=awaitsmartWallet.connect({client,personalAccount,});consttransaction=addSessionKey({contract:getContract({address: smartAccount.address,chain,client,}),account: smartAccount,sessionKeyAddress:"0x...",// the address of the new session keypermissions: {approvedTargets:"*",// the addresses of allowed contracts, or '*' for any contractnativeTokenLimitPerTransaction:0.1,// the maximum amount of native token (in ETH) that the session key can spend per transactionpermissionStartTimestamp:newDate(),// the date when the session key becomes activepermissionEndTimestamp:newDate(Date.now()+24*60*60*1000,),// the date when the session key expires},});awaitsendTransaction({transaction,account: smartAccount,});`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

