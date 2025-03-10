# createWalletAdapter

*Source: [https://portal.thirdweb.com/references/typescript/v5/createWalletAdapter](https://portal.thirdweb.com/references/typescript/v5/createWalletAdapter)*

* References
* createWalletAdapter

Creates a wallet from the given account.

You can use this to:

* convert a third party library wallet (wagmi, viem, ethers) into a thirdweb wallet.
* connect with a private key (for automated tests)

convert a third party library wallet (wagmi, viem, ethers) into a thirdweb wallet.

connect with a private key (for automated tests)

Available wallet adatpers:

* Viem
* Ethers 6
* Ethers 5

Viem

Ethers 6

Ethers 5

## Example

`import{ createWalletAdapter }from"thirdweb";constwallet=createWalletAdapter({client,adaptedAccount,chain,onDisconnect: ()=>{// disconnect logic},switchChain:async(chain)=>{// switch chain logic},});`
#### Signature

`functioncreateWalletAdapter(options:AdapterWalletOptions,):Wallet<"adapter">;`
## Parameters

#### options

The options for the adapter wallet.

### Type

`letoptions:{adaptedAccount:Account;chain:Chain;client:ThirdwebClient;onDisconnect:()=>Promise<void>|void;switchChain:(chain:Chain)=>Promise<void>|void;};`
## Returns

#### Return Type

`letreturnType:Wallet<"adapter">;`a wallet instance.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

