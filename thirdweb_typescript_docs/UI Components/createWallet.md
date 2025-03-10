# createWallet

*Source: [https://portal.thirdweb.com/references/typescript/v5/createWallet](https://portal.thirdweb.com/references/typescript/v5/createWallet)*

* References
* createWallet

Creates a wallet based on the provided ID and arguments.

* Supports 500+ wallets
* Handles both injected browser wallets and WalletConnect sessions

Supports 500+ wallets

Handles both injected browser wallets and WalletConnect sessions

View all available wallets

## Example

## Connecting the wallet

Once created, you can connect the wallet to your app by calling theconnectmethod.

`connect`Theconnectmethod returns a promise that resolves to the connected account.

`connect`Each wallet type can have different connect options.View the different connect options

## Connecting to an injected wallet

`import{ createWallet }from"thirdweb/wallets";constmetamaskWallet=createWallet("io.metamask");constaccount=awaitmetamaskWallet.connect({client,});`You can check if a wallet is installed by calling theinjectedProvidermethod.

## Connecting via WalletConnect modal

`import{ createWallet }from"thirdweb/wallets";constmetamaskWallet=createWallet("io.metamask");awaitmetamask.connect({client,walletConnect: {projectId:"YOUR_PROJECT_ID",showQrModal:true,appMetadata: {name:"My App",url:"https://my-app.com",description:"my app description",logoUrl:"https://path/to/my-app/logo.svg",},},});`View ConnectWallet connection options

## Connecting with coinbase wallet

`import{ createWallet }from"thirdweb/wallets";constcbWallet=createWallet("com.coinbase.wallet", {appMetadata: {name:"My App",url:"https://my-app.com",description:"my app description",logoUrl:"https://path/to/my-app/logo.svg",},walletConfig: {// options: 'all' | 'smartWalletOnly' | 'eoaOnly'options:"all",},});constaccount=awaitcbWallet.connect({client,});`View Coinbase wallet creation options

## Connecting with a smart wallet

`import{ createWallet }from"thirdweb/wallets";constwallet=createWallet("smart", {chain: sepolia,sponsorGas:true,});constaccount=awaitwallet.connect({client,personalAccount,// pass the admin account});`
#### Signature

`functioncreateWallet(...args:CreateWalletArgs<ID>):Wallet<ID>;`
## Parameters

#### args

The arguments for creating the wallet.

### Type

`letargs:CreateWalletArgs<ID>;`
## Returns

#### Return Type

`letreturnType:Wallet<ID>;`
* The created wallet.

The created wallet.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

