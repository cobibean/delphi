# injectedProvider

*Source: [https://portal.thirdweb.com/references/typescript/v5/injectedProvider](https://portal.thirdweb.com/references/typescript/v5/injectedProvider)*

* References
* injectedProvider

Get Injected Provider for given wallet by passing a wallet ID (rdns) usingEIP-6963Provider Discovery.

## Example

`import{ injectedProvider }from"thirdweb/wallets";constmetamaskProvider=injectedProvider("io.metamask");if(metamaskProvider) {console.log("Metamask is installed");}`
#### Signature

`functioninjectedProvider(walletId:WalletId):undefined|Ethereum;`
## Parameters

#### walletId

The Wallet Id (rdns) to check.

### Type

`letwalletId:|"walletConnect"|"inApp"|"embedded"|"smart"|"adapter"|EcosystemWalletId|WCSupportedWalletIds|InjectedSupportedWalletIds;`
## Returns

#### Return Type

`letreturnType:undefined|Ethereum;`The details of the Injected Provider if it exists.undefinedotherwise.

`undefined`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

