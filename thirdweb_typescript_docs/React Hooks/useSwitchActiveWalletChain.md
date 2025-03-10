# useSwitchActiveWalletChain

*Source: [https://portal.thirdweb.com/references/typescript/v5/useSwitchActiveWalletChain](https://portal.thirdweb.com/references/typescript/v5/useSwitchActiveWalletChain)*

* References
* useSwitchActiveWalletChain

Switch to blockchain with given chain id in the active wallet.

## Example

`import{ useSwitchActiveWalletChain }from"thirdweb/react";import{ sepolia }from"thirdweb/chains";constswitchChain=useSwitchActiveWalletChain();// later in your code<buttononClick={()=>switchChain(sepolia)}>Switch Chain</button>;`
#### Signature

`functionuseSwitchActiveWalletChain():(chain:Readonly,)=>Promise<void>;`
## Returns

#### Return Type

`letreturnType:(chain:Readonly)=>Promise<void>;`A function to switch to blockchain with given chain id in the active wallet.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

