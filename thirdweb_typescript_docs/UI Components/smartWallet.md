# smartWallet

*Source: [https://portal.thirdweb.com/references/typescript/v5/smartWallet](https://portal.thirdweb.com/references/typescript/v5/smartWallet)*

* References
* smartWallet

Creates a ERC4337 smart wallet based on a admin account.

Smart wallets are smart contract wallets that enable multiple benefits for users:

* Sponsor gas fees for transactions
* Multiple owners
* Session keys
* Batch transactions
* Predictable addresses
* Programmable features

Sponsor gas fees for transactions

Multiple owners

Session keys

Batch transactions

Predictable addresses

Programmable features

Learn more about account abstraction

## Example

## Connect to a smart wallet

To connect to a smart wallet, you need to provide an admin account as thepersonalAccountoption.

`personalAccount`Any wallet can be used as an admin account, including an in-app wallets.

ThesponsorGasoption is used to enable sponsored gas for transactions automatically.

`sponsorGas``import{ smartWallet, inAppWallet }from"thirdweb/wallets";import{ sepolia }from"thirdweb/chains";import{ sendTransaction }from"thirdweb";constwallet=smartWallet({chain: sepolia,sponsorGas:true,// enable sponsored transactions});// any wallet can be used as an admin account// in this example we use an in-app walletconstadminWallet=inAppWallet();constpersonalAccount=awaitadminWallet.connect({client,chain: sepolia,strategy:"google",});constsmartAccount=awaitwallet.connect({client,personalAccount,// pass the admin account});// sending sponsored transactions with the smartAccountawaitsendTransaction({account: smartAccount,transaction,});`
## Using a custom account factory

You can pass a custom account factory to thesmartWalletfunction to use a your own account factory.

`smartWallet``import{ smartWallet }from"thirdweb/wallets";import{ sepolia }from"thirdweb/chains";constwallet=smartWallet({chain: sepolia,sponsorGas:true,// enable sponsored transactionsfactoryAddress:"0x...",// custom factory address});`
## Using v0.7 Entrypoint

Both v0.6 (default) and v0.7 ERC4337 Entrypoints are supported. To use the v0.7 Entrypoint, simply pass in a compatible account factory.

You can use the predeployedDEFAULT_ACCOUNT_FACTORY_V0_7or deploy your ownAccountFactory  v0.7.

`DEFAULT_ACCOUNT_FACTORY_V0_7``import{smartWallet,DEFAULT_ACCOUNT_FACTORY_V0_7,}from"thirdweb/wallets/smart";import{ sepolia }from"thirdweb/chains";constwallet=smartWallet({chain: sepolia,sponsorGas:true,// enable sponsored transactionsfactoryAddress:DEFAULT_ACCOUNT_FACTORY_V0_7,// 0.7 factory address});`
## Configuring the smart wallet

You can pass options to thesmartWalletfunction to configure the smart wallet.

`smartWallet``import{ smartWallet }from"thirdweb/wallets";import{ sepolia }from"thirdweb/chains";constwallet=smartWallet({chain: sepolia,sponsorGas:true,// enable sponsored transactionsfactoryAddress:"0x...",// custom factory addressoverrides: {accountAddress:"0x...",// override account addressaccountSalt:"0x...",// override account saltentrypointAddress:"0x...",// override entrypoint addresstokenPaymaster: TokenPaymaster.BASE_USDC,// enable erc20 paymasterbundlerUrl:"https://...",// override bundler urlpaymaster: (userOp)=>{...},// override paymaster...}});`Refer toSmartWalletOptionsfor more details.

#### Signature

`functionsmartWallet(createOptions:SmartWalletOptions,):Wallet<"smart">;`
## Parameters

#### createOptions

The options for creating the wallet.
Refer toSmartWalletCreationOptionsfor more details.

### Type

`letcreateOptions:Prettify<{chain:Chain;factoryAddress?:string;overrides?:{accountAddress?:string;accountSalt?:string;bundlerUrl?:string;createAccount?:(factoryContract:ThirdwebContract,admin:string,)=>PreparedTransaction;entrypointAddress?:string;execute?:(accountContract:ThirdwebContract,transaction:SendTransactionOption,)=>PreparedTransaction;executeBatch?:(accountContract:ThirdwebContract,transactions:Array<SendTransactionOption>,)=>PreparedTransaction;getAccountNonce?:(accountContract:ThirdwebContract,)=>Promise<bigint>;paymaster?:(userOp:UserOperationV06|UserOperationV07,)=>Promise<PaymasterResult>;predictAddress?:(factoryContract:ThirdwebContract,admin:string,)=>Promise<string>;signMessage?:(options:{accountContract:ThirdwebContract;adminAccount:Account;factoryContract:ThirdwebContract;message:SignableMessage;})=>Promise<Hex>;signTypedData?:(options:{accountContract:ThirdwebContract;adminAccount:Account;factoryContract:ThirdwebContract;typedData:ox__TypedData.Definition<typedData,primaryType>;})=>Promise<Hex>;tokenPaymaster?:TokenPaymasterConfig;};sessionKey?:{address:string;permissions:AccountPermissions};}&({gasless:boolean}|{sponsorGas:boolean})>;`
## Returns

#### Return Type

`letreturnType:Wallet<"smart">;`The created smart wallet.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

