# ConnectEmbed

*Source: [https://portal.thirdweb.com/references/typescript/v5/ConnectEmbed](https://portal.thirdweb.com/references/typescript/v5/ConnectEmbed)*

* References
* ConnectEmbed

An inline wallet connection component that allows to:

* Connect to 500+ external wallets
* Connect with email, phone, passkey or socials
* Convert any wallet to a ERC4337 smart wallet for gasless transactions
* Sign in with ethereum (Auth)

Connect to 500+ external wallets

Connect with email, phone, passkey or socials

Convert any wallet to a ERC4337 smart wallet for gasless transactions

Sign in with ethereum (Auth)

It renders the same UI as theConnectButtoncomponent's modal - but directly inline in the page instead of being in a modal.

`ConnectButton`Once connected, the component does not render any UI. It only renders UI if wallet is not connected.

## Example

## Default setup

`import{ createThirdwebClient }from"thirdweb";import{ ConnectEmbed }from"thirdweb/react";constclient=createThirdwebClient({ clientId:"YOUR_CLIENT_ID"});<ConnectEmbedclient={client}/>;`View all available config options

## Customization options

### Customizing wallet options

`<ConnectEmbedclient={client}wallets={[createWallet("io.metamask"),createWallet("com.coinbase.wallet"),createWallet("me.rainbow"),]}/>;`View all available wallets

### Customizing the default chain to connect to

`import{ base }from"thirdweb/chains";<ConnectEmbedclient={client}chain={base}/>;`
### Enabling Account Abstraction

By passing theaccountAbstractionprop, ALL connected wallets will be converted to smart accounts.
And by settingsponsorGastotrue, all transactions done with those smart accounts will be sponsored.

`accountAbstraction``sponsorGas``true``<ConnectEmbedclient={client}accountAbstraction={{chain: sepolia,sponsorGas:true,}}/>;`Note that this prop doesn't affect ecosystem wallets. Ecosystem wallets will only be converted to smart accounts if the ecosystem owner has enabled account abstraction.

### Enabling sign in with ethereum (Auth)

`<ConnectEmbedclient={client}auth={{isLoggedIn:async(address)=>{console.log("checking if logged in!", { address });returnawaitisLoggedIn();},doLogin:async(params)=>{console.log("logging in!");awaitlogin(params);},getLoginPayload:async({address})=>generatePayload({ address }),doLogout:async()=>{console.log("logging out!");awaitlogout();},}}/>;`
### Customizing the theme

`<ConnectEmbedclient={client}theme="light"/>;`For more granular control, you can also pass a custom theme object:

`<ConnectEmbedclient={client}theme={lightTheme({colors: {modalBg:"red",},})}/>;`View all available themes properties

### Changing the display language

`<ConnectEmbedclient={client}locale="ja_JP"/>;`View all available locales

#### Signature

`functionConnectEmbed(props:ConnectEmbedProps):Element;`
## Parameters

#### props

The props for theConnectEmbedcomponent.

`ConnectEmbed`Refer to theConnectEmbedPropstype for more details

`ConnectEmbedProps`
### Type

`letprops:{accountAbstraction?:SmartWalletOptions;appMetadata?:AppMetadata;auth?:SiweAuthOptions;autoConnect?:{timeout:number}|boolean;chain?:Chain;chains?:Array<Chain>;className?:string;client:ThirdwebClient;header?:{title?:string;titleIcon?:string}|true;locale?:LocaleId;modalSize?:"compact"|"wide";onConnect?:(wallet:Wallet)=>void;privacyPolicyUrl?:string;recommendedWallets?:Array<Wallet>;requireApproval?:boolean;showAllWallets?:boolean;showThirdwebBranding?:boolean;style?:React.CSSProperties;termsOfServiceUrl?:string;theme?:"dark"|"light"|Theme;walletConnect?:{projectId?:string};wallets?:Array<Wallet>;welcomeScreen?:WelcomeScreen;};`
## Returns

#### Return Type

`letreturnType:Element;`A JSX element that renders the<ConnectEmbed>component.

`<ConnectEmbed>`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

