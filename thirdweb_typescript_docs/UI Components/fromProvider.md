# fromProvider

*Source: [https://portal.thirdweb.com/references/typescript/v5/eip1193/fromProvider](https://portal.thirdweb.com/references/typescript/v5/eip1193/fromProvider)*

* References
* fromProvider

Creates a Thirdweb wallet from an EIP-1193 compatible provider.

This adapter allows you to use any EIP-1193 provider (like MetaMask, WalletConnect, etc.) as a Thirdweb wallet.
It handles all the necessary conversions between the EIP-1193 interface and Thirdweb's wallet interface.

## Example

`import{ EIP1193 }from"thirdweb/wallets";// Create a Thirdweb wallet from MetaMask's providerconstwallet=EIP1193.fromProvider({provider: window.ethereum,walletId:"io.metamask",});// Use like any other Thirdweb walletconstaccount=awaitwallet.connect({client:createThirdwebClient({ clientId:"..."}),});// Sign messagesawaitaccount.signMessage({ message:"Hello World"});// Send transactionsawaitaccount.sendTransaction({to:"0x...",value:1000000000000000000n,});`
#### Signature

`functionfromProvider(options:FromEip1193AdapterOptions):Wallet;`
## Parameters

#### options

Configuration options for creating the wallet adapter

### Type

`letoptions:{provider:EIP1193Provider|(()=>Promise<EIP1193Provider>);walletId?:WalletId;};`
## Returns

#### Return Type

`letreturnType:{getAdminAccount?:()=>Account|undefined;getConfig:()=>CreateWalletArgs<TWalletId>[1];id:TWalletId;onConnectRequested?:()=>Promise<void>;subscribe:WalletEmitter<TWalletId>["subscribe"];autoConnect:(options:WalletAutoConnectionOption<TWalletId>,)=>Promise<Account>;connect:(options:WalletConnectionOption<TWalletId>,)=>Promise<Account>;disconnect:()=>Promise<void>;getAccount:()=>undefined|Account;getChain:()=>|undefined|Readonly<ChainOptions&{rpc:string}>;switchChain:(chain:Readonly)=>Promise<void>;};`A Thirdweb wallet instance that wraps the EIP-1193 provider

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

