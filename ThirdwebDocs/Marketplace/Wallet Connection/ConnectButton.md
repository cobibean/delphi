# ConnectButton

*Source: [https://portal.thirdweb.com/references/typescript/v5/ConnectButton](https://portal.thirdweb.com/references/typescript/v5/ConnectButton)*

* References
* ConnectButton

A fully featured wallet connection component that allows to:

* Connect to 500+ external wallets
* Connect with email, phone, passkey or socials
* Convert any wallet to a ERC4337 smart wallet for gasless transactions
* Sign in with ethereum (Auth)

Connect to 500+ external wallets

Connect with email, phone, passkey or socials

Convert any wallet to a ERC4337 smart wallet for gasless transactions

Sign in with ethereum (Auth)

Once connected, the component allows to:

* Reolve ENS names and avatars
* Manage multipple connected wallets
* Send and receive native tokens and ERC20 tokens
* View ERC20 tokens and NFTs
* Onramp, bridge and swap tokens
* Switch chains
* Connect to another app with WalletConnect

Reolve ENS names and avatars

Manage multipple connected wallets

Send and receive native tokens and ERC20 tokens

View ERC20 tokens and NFTs

Onramp, bridge and swap tokens

Switch chains

Connect to another app with WalletConnect

## Example

## Default setup

`import{ createThirdwebClient }from"thirdweb";import{ ConnectButton }from"thirdweb/react";constclient=createThirdwebClient({ clientId:"YOUR_CLIENT_ID"});<ConnectButtonclient={client}/>;`View all available config options

## Customization options

### Customizing wallet options

`<ConnectButtonclient={client}wallets={[createWallet("io.metamask"),createWallet("com.coinbase.wallet"),createWallet("me.rainbow"),]}/>;`View all available wallets

### Customizing the default chain to connect to

`import{ sepolia }from"thirdweb/chains";<ConnectButtonclient={client}chain={sepolia}/>;`
### Enabling Account Abstraction

By passing theaccountAbstractionprop, ALL connected wallets will be converted to smart accounts.
And by settingsponsorGastotrue, all transactions done with those smart accounts will be sponsored.

`accountAbstraction``sponsorGas``true``<ConnectButtonclient={client}accountAbstraction={{chain: sepolia,sponsorGas:true,}}/>;`Note that this prop doesn't affect ecosystem wallets. Ecosystem wallets will only be converted to smart accounts if the ecosystem owner has enabled account abstraction.

### Enabling sign in with ethereum (Auth)

`<ConnectButtonclient={client}auth={{isLoggedIn:async(address)=>{console.log("checking if logged in!", { address });returnawaitisLoggedIn();},doLogin:async(params)=>{console.log("logging in!");awaitlogin(params);},getLoginPayload:async({address})=>generatePayload({ address }),doLogout:async()=>{console.log("logging out!");awaitlogout();},}}/>;`
### Customizing the theme

`<ConnectButtonclient={client}theme="light"/>;`For more granular control, you can also pass a custom theme object:

`<ConnectButtonclient={client}theme={lightTheme({colors: {modalBg:"red",},})}/>;`View all available themes properties

### Changing the display language

`<ConnectEmbedclient={client}locale="ja_JP"/>;`View all available locales

### Customizing the connect button UI

`<ConnectButtonclient={client}connectButton={{label:"Sign in to MyApp",}}/>;`
### Customizing the modal UI

`<ConnectButtonclient={client}connectModal={{title:"Sign in to MyApp",titleIcon:"https://example.com/logo.png",size:"compact",}}/>;`
### Customizing details button UI (after connecting)

`<ConnectButtonclient={client}detailsButton={{displayBalanceToken: {[sepolia.id]:"0x...",// token address to display balance for[ethereum.id]:"0x...",// token address to display balance for},}}/>;`View all available auth helper functions

### Customizing the Auth sign in button (after connecting, but before authenticating)

`<ConnectButtonclient={client}auth={{...}}signInButton:{label:"Authenticate with MyApp",},}}/>;`
### Customizing supported Tokens and NFTs

These tokens and NFTs will be shown in the modal when the user clicks "View Assets", as well as the send token screen.

`<ConnectButtonclient={client}supportedTokens={{[ethereum.id]: [{address:"0x...",name:"MyToken",symbol:"MT",icon:"https://example.com/icon.png",},],}}supportedNFTs={{[ethereum.id]: ["0x...",// nft contract address],}}/>;`
### Customizing the orders of the tabs in the [View Funds] screen

When you click on "View Assets", by default the "Tokens" tab is shown first.
If you want to show the "NFTs" tab first, change the order of the asset tabs to: ["nft", "token"]
Note: If an empty array is passed, the [View Funds] button will be hidden

`<ConnectButtonclient={client}detailsModal={{assetTabs: ["nft","token"],}}/>;`
### Callback for when the details modal is closed

`<ConnectButtondetailsModal={{onClose: (screen:string)=>{console.log({ screen });},}}/>;`
#### Signature

`functionConnectButton(props:ConnectButtonProps):Element;`
## Parameters

#### props

Props for theConnectButtoncomponent

`ConnectButton`Refer toConnectButtonPropsto see the available props.

### Type

`letprops:{accountAbstraction?:SmartWalletOptions;appMetadata?:AppMetadata;auth?:SiweAuthOptions;autoConnect?:{timeout:number}|boolean;chain?:Chain;chains?:Array<Chain>;client:ThirdwebClient;connectButton?:ConnectButton_connectButtonOptions;connectModal?:ConnectButton_connectModalOptions;detailsButton?:ConnectButton_detailsButtonOptions;detailsModal?:ConnectButton_detailsModalOptions;locale?:LocaleId;onConnect?:(wallet:Wallet)=>void;onDisconnect?:(info:{account:Account;wallet:Wallet})=>void;recommendedWallets?:Array<Wallet>;showAllWallets?:boolean;signInButton?:{className?:string;label?:string;style?:React.CSSProperties;};supportedNFTs?:SupportedNFTs;supportedTokens?:SupportedTokens;switchButton?:{className?:string;label?:string;style?:React.CSSProperties;};theme?:"dark"|"light"|Theme;walletConnect?:{projectId?:string};wallets?:Array<Wallet>;};`
## Returns

#### Return Type

`letreturnType:Element;`A JSX element that renders the<ConnectButton>component.

`<ConnectButton>`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

