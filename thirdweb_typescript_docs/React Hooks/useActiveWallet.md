# useActiveWallet

*Source: [https://portal.thirdweb.com/references/typescript/v5/useActiveWallet](https://portal.thirdweb.com/references/typescript/v5/useActiveWallet)*

* References
* useActiveWallet

A hook that returns the active wallet

## Example

### Basic usage

`import{ useActiveWallet }from"thirdweb/react";constwallet=useActiveWallet();`
### Listen to account change event

`constwallet=useActiveWallet();wallet?.subscribe("accountChanged", (account)=>{console.log(account);});`
### Listen to multiple accounts changed event

`constwallet=useActiveWallet();wallet?.subscribe("accountsChanged", (addresses)=>{console.log(addresses);});`
### Listen to network change event

`constwallet=useActiveWallet();wallet?.subscribe("chainChanged", (chain)=>{console.log(chain);});`
#### Signature

`functionuseActiveWallet():undefined|Wallet;`
## Returns

#### Return Type

`letreturnType:undefined|Wallet;`The activeWalletorundefinedif no active wallet is set.

`Wallet``undefined`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

