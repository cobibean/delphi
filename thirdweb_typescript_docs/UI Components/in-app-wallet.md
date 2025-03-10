# In-App Wallets

*Source: [https://portal.thirdweb.com/typescript/v5/in-app-wallet](https://portal.thirdweb.com/typescript/v5/in-app-wallet)*

Create in-app wallet for your users based on their email, phone, passkey, social auth or even their external wallets. These wallets are scoped by your clientId and do not require any confirmation to sign transactions.

## Available auth methods

* Email
* Phone
* Passkey
* Guest
* Wallet
* Google
* Apple
* Facebook
* X
* Discord
* Telegram
* Twitch
* Farcaster
* Github
* Line
* Coinbase
* Steam
* Backend

## Live Playground

Try out in-app wallets for yourself in thein-app wallet live playground

### Try the demo

See the SDK in action on the live playground

## Configure in-app wallets

The simplest way to create an in-app wallet is to use theinAppWallet()function. By default, this will create a wallet that supports email/password login, Google, Apple, Facebook login, and passkey.

`inAppWallet()````typescript
import { inAppWallet } from "thirdweb/wallets"; const wallet = inAppWallet();
```

`import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet();`You can also customize the wallet by passing in options.

```typescript
import { inAppWallet } from "thirdweb/wallets"; const wallet = inAppWallet({  auth: {    mode, // options are "popup" | "redirect" | "window";    options, // ex: ["discord", "farcaster", "apple", "facebook", "google", "passkey"],    passkeyDomain, // for passkey, the domain that the passkey is created on    redirectUrl, // the URL to redirect to after authentication  },  metadata, // metadata for the wallet (name, icon, etc.)  smartAccount, // smart account options for the wallet (for gasless tx)});
```

`import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet({auth: {mode,// options are "popup" | "redirect" | "window";options,// ex: ["discord", "farcaster", "apple", "facebook", "google", "passkey"],passkeyDomain,// for passkey, the domain that the passkey is created onredirectUrl,// the URL to redirect to after authentication},metadata,// metadata for the wallet (name, icon, etc.)smartAccount,// smart account options for the wallet (for gasless tx)});`View all in-app wallet options.

Once created, you can use it either with the prebuilt UI components, or with your own UI.

## Usage

```typescript
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";import { inAppWallet } from "thirdweb/wallets"; const client = createThirdwebClient({ clientId });const wallet = inAppWallet(); const account = await wallet.connect({  client,  strategy: "google",}); console.log("connected as", account.address);
```

`import{ ThirdwebProvider, ConnectButton }from"thirdweb/react";import{ inAppWallet }from"thirdweb/wallets";constclient=createThirdwebClient({ clientId });constwallet=inAppWallet();constaccount=awaitwallet.connect({client,strategy:"google",});console.log("connected as", account.address);`
## API Reference

View all the auth and configuration options for in-app wallets in theAPI Reference.

### inAppWallet

Create an in-app wallet from any auth

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

