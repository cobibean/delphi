# PayEmbed

*Source: [https://portal.thirdweb.com/references/typescript/v5/PayEmbed](https://portal.thirdweb.com/references/typescript/v5/PayEmbed)*

* References
* PayEmbed

Embed a prebuilt UI for funding wallets, purchases or transactions with crypto or fiat.

## Example

### Default configuration

By default, thePayEmbedcomponent will allows users to fund their wallets with crypto or fiat on any of the supported chains..

`PayEmbed``<PayEmbedclient={client}/>;`
### Top up wallets

You can set themodeoption to"fund_wallet"to allow users to top up their wallets with crypto or fiat.

`mode``"fund_wallet"``<PayEmbedclient={client}payOptions={{mode:"fund_wallet",metadata: {name:"Get funds",// title of the payment modal},prefillBuy: {chain: base,// chain to prefill the buy screen withamount:"0.01",// amount to prefill the buy screen with},}}/>;`
### Direct Payments

You can set themodeoption to"direct_payment"to allow users to make a direct payment to a wallet address.

`mode``"direct_payment"``<PayEmbedclient={client}theme={"light"}payOptions={{mode:"direct_payment",paymentInfo: {amount:"35",chain: base,token:getDefaultToken(base,"USDC"),sellerAddress:"0x...",// the wallet address of the seller},metadata: {name:"Black Hoodie (Size L)",image:"/drip-hoodie.png",},}}/>;`
### Transactions

You can set themodeoption to"transaction"to allow users to execute a transaction with a different wallet, chain or token.

`mode``"transaction"``<PayEmbedclient={client}payOptions={{mode:"transaction",// can be any transactiontransaction:claimTo({contract: nftContract,quantity:1n,tokenId:0n,to:"0x...",}),// this could be any metadata, including NFT metadatametadata: {name:"VIP Ticket",image:"https://...",},}}/>;`You can also handle ERC20 payments by passingerc20valueto your transaction:

`erc20value``<PayEmbedclient={client}payOptions={{mode:"transaction",transaction:prepareContractCall({contract: yourContract,functionName:"purchase",args: [arg1, arg2,...],erc20value: {token:USDC_TOKEN_ADDRESS,// the erc20 token required to purchaseamount:toUnits("100",6),// the amount of erc20 token required to purchase},}),}}/>`
### Enable/Disable payment methods

You can disable the use of crypto or fiat by setting thebuyWithCryptoorbuyWithFiatoptions tofalse.

`buyWithCrypto``buyWithFiat``false``<PayEmbedclient={client}payOptions={{buyWithFiat:false,}}/>### Customize theUIYou can customize theUIofthe`PayEmbed`component by passing a custom theme object to the`theme`prop.```tsx<PayEmbedclient={client}theme={darkTheme({colors: {modalBg: "red",},})}/>`Refer to theThemetype for more details.

`Theme`
### Configure the wallet connection

You can customize the wallet connection flow by passing aconnectOptionsobject to thePayEmbedcomponent.

`connectOptions``PayEmbed``<PayEmbedclient={client}connectOptions={{connectModal: {size:"compact",title:"Sign in",},}}/>;`Refer to thePayEmbedConnectOptionstype for more details.

`PayEmbedConnectOptions`@buyCrypto

#### Signature

`functionPayEmbed(props:PayEmbedProps):Element;`
## Parameters

#### props

Props of typePayEmbedPropsto configure the PayEmbed component.

`PayEmbedProps`
### Type

`letprops:{activeWallet?:Wallet;className?:string;client:ThirdwebClient;connectOptions?:PayEmbedConnectOptions;hiddenWallets?:Array<WalletId>;locale?:LocaleId;payOptions?:PayUIOptions;style?:React.CSSProperties;supportedTokens?:SupportedTokens;theme?:"light"|"dark"|Theme;};`
## Returns

#### Return Type

`letreturnType:Element;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

