# ThirdwebProvider

*Source: [https://portal.thirdweb.com/references/typescript/v5/ThirdwebProvider](https://portal.thirdweb.com/references/typescript/v5/ThirdwebProvider)*

* References
* ThirdwebProvider

The ThirdwebProvider is component is a provider component that sets up the React Query client.

## Example

`import{ ThirdwebProvider }from"thirdweb/react";functionExample() {return(<ThirdwebProvider><App/></ThirdwebProvider>);}`
#### Signature

`functionThirdwebProvider(props:PropsWithChildren<{connectionManager?:{activeAccountStore:Store<undefined|Account>;activeWalletChainStore:Store<undefined|Readonly<ChainOptions&{rpc:string}>>;activeWalletConnectionStatusStore:Store<ConnectionStatus>;activeWalletStore:Store<undefined|Wallet>;addConnectedWallet:(wallet:Wallet)=>void;connect:(wallet:Wallet,options?:ConnectManagerOptions,)=>Promise<Wallet>;connectedWallets:ReadonlyStore<Array<Wallet>>;defineChains:(chains:Array<Readonly<ChainOptions&{rpc:string}>>,)=>void;disconnectWallet:(wallet:Wallet)=>void;handleConnection:(wallet:Wallet,options?:ConnectManagerOptions,)=>Promise<Wallet>;isAutoConnecting:Store<boolean>;removeConnectedWallet:(wallet:Wallet)=>void;setActiveWallet:(activeWallet:Wallet)=>Promise<void>;switchActiveWalletChain:(chain:Readonly)=>Promise<void>;};}>,):Element;`
## Parameters

#### props

The props for the ThirdwebProvider

### Type

`letprops:PropsWithChildren<{connectionManager?:{activeAccountStore:Store<undefined|Account>;activeWalletChainStore:Store<undefined|Readonly<ChainOptions&{rpc:string}>>;activeWalletConnectionStatusStore:Store<ConnectionStatus>;activeWalletStore:Store<undefined|Wallet>;addConnectedWallet:(wallet:Wallet)=>void;connect:(wallet:Wallet,options?:ConnectManagerOptions,)=>Promise<Wallet>;connectedWallets:ReadonlyStore<Array<Wallet>>;defineChains:(chains:Array<Readonly<ChainOptions&{rpc:string}>>,)=>void;disconnectWallet:(wallet:Wallet)=>void;handleConnection:(wallet:Wallet,options?:ConnectManagerOptions,)=>Promise<Wallet>;isAutoConnecting:Store<boolean>;removeConnectedWallet:(wallet:Wallet)=>void;setActiveWallet:(activeWallet:Wallet)=>Promise<void>;switchActiveWalletChain:(chain:Readonly)=>Promise<void>;};}>;`
## Returns

#### Return Type

`letreturnType:Element;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

