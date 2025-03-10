# toProvider

*Source: [https://portal.thirdweb.com/references/typescript/v5/eip1193/toProvider](https://portal.thirdweb.com/references/typescript/v5/eip1193/toProvider)*

* References
* toProvider

Converts a Thirdweb wallet into an EIP-1193 compatible provider.

This adapter allows you to use a Thirdweb wallet with any library or dApp that expects an EIP-1193 provider.
The provider implements the standard EIP-1193 interface including request handling and event subscription.

## Example

`import{ EIP1193 }from"thirdweb/wallets";// Create an EIP-1193 provider from a Thirdweb walletconstprovider=EIP1193.toProvider({wallet,chain: ethereum,client:createThirdwebClient({ clientId:"..."}),});// Use with any EIP-1193 compatible libraryconstaccounts=awaitprovider.request({method:"eth_requestAccounts",});// Listen for eventsprovider.on("accountsChanged", (accounts)=>{console.log("Active accounts:", accounts);});`
#### Signature

`functiontoProvider(options:ToEip1193ProviderOptions,):EIP1193Provider;`
## Parameters

#### options

Configuration options for creating the provider

### Type

`letoptions:{chain:Chain;client:ThirdwebClient;connectOverride?:(wallet:Wallet)=>Promise<Account>;wallet:Wallet;};`
## Returns

#### Return Type

`letreturnType:{request:(params:any)=>Promise<any>;on:(event:any,listener:(params:any)=>any)=>void;removeListener:(event:any,listener:(params:any)=>any,)=>void;};`An EIP-1193 compatible provider that wraps the Thirdweb wallet

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

