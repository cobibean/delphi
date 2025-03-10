# ecosystemWallet

*Source: [https://portal.thirdweb.com/references/typescript/v5/ecosystemWallet](https://portal.thirdweb.com/references/typescript/v5/ecosystemWallet)*

* References
* ecosystemWallet

Creates anEcosystem Walletbased on various authentication methods. Full list of available authentication methodshere.

Can also be configured to use Account Abstraction to directly connect to a ERC4337 smart account based on those authentication methods.

Refer toinAppWalletfor detailed usage examples.

## Example

### Logging into an ecosystem wallet

Below is the general code snippet needed to connect via a given auth strategy to an ecosystem wallet. For more variants on the various auth strategies, refer toinAppWallet.

`import{ ecosystemWallet }from"thirdweb/wallets";constwallet=ecosystemWallet("ecosystem.hooli");constaccount=awaitwallet.connect({client,chain,strategy:"google",});`View all connection options.

### Connect to a restricted ecosystem wallet with your designated partner ID

The partner ID will be provided to you by the ecosystem with which you're integrating.

`import{ ecosystemWallet }from"thirdweb/wallets";constwallet=ecosystemWallet("ecosystem.hooli", {partnerId:"...",});`
#### Signature

`functionecosystemWallet(id:`ecosystem.${string}`,options:EcosystemWalletCreationOptions,):Wallet<`ecosystem.${string}`>;`
## Parameters

#### id

### Type

`letid:`ecosystem.${string}`;`
#### options

### Type

`letoptions:{auth?:{defaultSmsCountryCode?:SupportedSmsCountry;mode?:"popup"|"redirect"|"window";redirectUrl?:string;};partnerId?:string;storage?:AsyncStorage;};`
## Returns

#### Return Type

`letreturnType:Wallet<`ecosystem.${string}`>;`The created ecosystem wallet.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

