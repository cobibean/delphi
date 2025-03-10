# useConnect

*Source: [https://portal.thirdweb.com/references/typescript/v5/useConnect](https://portal.thirdweb.com/references/typescript/v5/useConnect)*

* References
* useConnect

A hook to set a wallet as active wallet

## Example

`import{ createThirdwebClient }from"thirdweb";import{ useConnect }from"thirdweb/react";import{ createWallet }from"thirdweb/wallets";constclient=createThirdwebClient({clientId:"YOUR_CLIENT_ID",});functionExample() {const{connect,isConnecting,error}=useConnect();return(<buttononClick={()=>connect(async()=>{// instantiate walletconstwallet=createWallet("io.metamask");// connect walletawaitwallet.connect({client,});// return the walletreturnwallet;})}>Connect</button>);}`
#### Signature

`functionuseConnect(options?:ConnectManagerOptions):{readonlyconnect:(walletOrFn:Wallet|(()=>Promise<Wallet>),)=>Promise<null|Wallet>;error:null|Error;isConnecting:boolean;};`
## Parameters

#### options

### Type

`letoptions:{accountAbstraction?:SmartWalletOptions;client:ThirdwebClient;onConnect?:(wallet:Wallet)=>void;setWalletAsActive?:boolean;};`
## Returns

#### Return Type

`letreturnType:{readonlyconnect:(walletOrFn:Wallet|(()=>Promise<Wallet>),)=>Promise<null|Wallet>;error:null|Error;isConnecting:boolean;};`A function that lets you connect a wallet.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

