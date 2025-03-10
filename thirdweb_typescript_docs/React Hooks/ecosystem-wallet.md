# Connect Users to your Ecosystem

*Source: [https://portal.thirdweb.com/typescript/v5/ecosystem-wallet](https://portal.thirdweb.com/typescript/v5/ecosystem-wallet)*

Ecosystem wallets inherit all the functionality ofin-app wallets, but instead of being scoped to a single app, they can be used across multiple applications.

Head over to thethirdweb dashboardto create an ecosystem and obtain your ecosystem id.

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

Try out ecosystem wallets for yourself in thein-app wallet live playground

### Try the demo

See the SDK in action on the live playground

## Configure ecosystem wallets

The only difference with in-app wallets is how you create an ecosystem wallet using theecosystemWallet()function and passing your ecosystem id.

`ecosystemWallet()````typescript
import { ecosystemWallet } from "thirdweb/wallets"; const wallet = ecosystemWallet("ecosystem.your-ecosystem-id");
```

`import{ ecosystemWallet }from"thirdweb/wallets";constwallet=ecosystemWallet("ecosystem.your-ecosystem-id");`
## Configuring auth strategies

You can configure the allowed auth strategies onyour dashboard.

For prebuilt UIs, the enabled auth strategies are automatically read from your dashbaord configurations.

For custom UIs, you can configure the auth options when connecting the wallet. Seeusing your own UIfor an example.

### Using disabled auth strategies

Note that while you're allowed to pass any auth strategy today, we recommend only passing the strategies that are enabled on your dashboard. We might enforce this in the future.

## Passing a partner ID

For closed ecosystems, you can invite partners to your ecosystem. Partners will have to pass a validpartnerIdto theecosystemWallet()function in order to connect to your ecosystem.

`partnerId``ecosystemWallet()````typescript
const wallet = ecosystemWallet("ecosystem.your-ecosystem-id", {  partnerId: "your-partner-id",});
```

`constwallet=ecosystemWallet("ecosystem.your-ecosystem-id", {partnerId:"your-partner-id",});`For more information, refer to theecosystemWallet API reference.

### ecosystemWallet API reference

Learn more about the ecosystemWallet function

## Using ecosystem wallets

Refer to thein-app walletsdocumentation to add your ecosystem wallet to your applications.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

