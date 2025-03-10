# inAppWallet

*Source: [https://portal.thirdweb.com/references/typescript/v5/inAppWallet](https://portal.thirdweb.com/references/typescript/v5/inAppWallet)*

* References
* inAppWallet

Creates an app scoped wallet for users based on various authentication methods. Full list of available authentication methodshere.

Can also be configured to use Account Abstraction to directly connect to a ERC4337 smart account based on those authentication methods.

## Example

### Login with socials

`import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet();constaccount=awaitwallet.connect({client,chain,strategy:"google",});`View all available social auth methods

### Enable smart accounts and sponsor gas for your users:

`import{ inAppWallet }from"thirdweb/wallets";import{ sepolia }from"thirdweb/chains";constwallet=inAppWallet({smartAccount: {chain: sepolia,sponsorGas:true,},});// account will be a smart account with sponsored gas enabledconstaccount=awaitwallet.connect({client,strategy:"google",});`
### Login with email

`import{inAppWallet,preAuthenticate,}from"thirdweb/wallets/in-app";constwallet=inAppWallet();// sends a verification code to the provided emailawaitpreAuthenticate({client,strategy:"email",email:"[email protected]",});// login with the verification codeconstaccount=awaitwallet.connect({client,chain,strategy:"email",email:"[email protected]",verificationCode:"123456",});`
### Login with SIWE

`import{ inAppWallet, createWallet }from"thirdweb/wallets";constrabby=createWallet("io.rabby");constinAppWallet=inAppWallet();constaccount=awaitinAppWallet.connect({strategy:"wallet",chain: mainnet,wallet: rabby,client:MY_CLIENT,});`
### Login with phone number

`import{inAppWallet,preAuthenticate,}from"thirdweb/wallets/in-app";constwallet=inAppWallet();// sends a verification code to the provided phone numberawaitpreAuthenticate({client,strategy:"phone",phoneNumber:"+1234567890",});// login with the verification codeconstaccount=awaitwallet.connect({client,chain,strategy:"phone",honeNumber:"+1234567890",verificationCode:"123456",});`
### Login with passkey

`import{inAppWallet,hasStoredPasskey,}from"thirdweb/wallets/in-app";constwallet=inAppWallet();constwallet=inAppWallet();consthasPasskey=awaithasStoredPasskey(client);awaitwallet.connect({client,strategy:"passkey",type: hasPasskey?"sign-in":"sign-up",});`
### Connect to a guest account

`import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet();constaccount=awaitwallet.connect({client,strategy:"guest",});`
### Connect to a backend account

`import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet();constaccount=awaitwallet.connect({client,strategy:"backend",walletSecret:"...",// Provided by your app});`
### Connect with custom JWT (any OIDC provider)

You can use any OIDC provider to authenticate your users. Make sure to configure it in your dashboard under in-app wallet settings.

`import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet();constaccount=awaitwallet.connect({client,strategy:"jwt",jwt:"your_jwt_here",});`
### Connect with custom endpoint

You can also use your own endpoint to authenticate your users. Make sure to configure it in your dashboard under in-app wallet settings.

`import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet();constaccount=awaitwallet.connect({client,strategy:"auth_endpoint",payload:"your_auth_payload_here",});`
### Specify a logo for your login page (Connect UI)

`import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet({metadata: {image: {src:"https://example.com/logo.png",alt:"My logo",width:100,height:100,},},});`
### Hide the ability to export the private key within the Connect Modal UI

`import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet({hidePrivateKeyExport:true,});`
### Open the Oauth window in the same tab

By default, the Oauth window will open in a popup window. You can change this behavior by setting theauth.modeoption to"redirect".

`auth.mode``"redirect"``import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet({auth: {mode:"redirect",},});`
### Override storage for the wallet state

By default, wallet state is stored in the browser's local storage. You can override this behavior by providing a custom storage object, useful for server side integrations.

`import{ inAppWallet }from"thirdweb/wallets";import{ AsyncStorage }from"thirdweb/storage";constmyStorage:AsyncStorage={getItem:async(key)=>{returncustomGet(`CUSTOM_STORAGE_KEY${key}`);},setItem:async(key,value)=>{returncustomSet(`CUSTOM_STORAGE_KEY${key}`, value);},removeItem:async(key)=>{returncustomRemove(`CUSTOM_STORAGE_KEY${key}`);},};constwallet=inAppWallet({storage: myStorage,});`
#### Signature

`functioninAppWallet(createOptions?:InAppWalletCreationOptions,):Wallet<"inApp">;`
## Parameters

#### createOptions

configuration options
Refer toInAppWalletCreationOptionsto see the available options.

### Type

`letcreateOptions:|{auth?:{defaultSmsCountryCode?:SupportedSmsCountry;mode?:"popup"|"redirect"|"window";options:Array<InAppWalletAuth>;passkeyDomain?:string;redirectUrl?:string;};hidePrivateKeyExport?:boolean;metadata?:{image?:{alt?:string;height?:number;src:string;width?:number;};};partnerId?:string;smartAccount?:SmartWalletOptions;storage?:AsyncStorage;}|undefined;`
## Returns

#### Return Type

`letreturnType:Wallet<"inApp">;`The created in-app wallet.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

