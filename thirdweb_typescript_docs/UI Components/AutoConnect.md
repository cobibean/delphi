# autoConnect

*Source: [https://portal.thirdweb.com/references/typescript/v5/autoConnect](https://portal.thirdweb.com/references/typescript/v5/autoConnect)*

* References
* autoConnect

Attempts to automatically connect to the last connected wallet.
It combines both specified wallets and installed wallet providers that aren't already specified.

## Example

`import{ autoConnect }from"thirdweb/wallets";constautoConnected=awaitautoConnect({client,onConnect: (wallet)=>{console.log("wallet", wallet);},});`
#### Signature

`functionautoConnect(props:AutoConnectProps&{wallets?:Array<Wallet> },):Promise<boolean>;`
## Parameters

#### props

The auto-connect configuration properties

### Type

`letprops:AutoConnectProps&{wallets?:Array<Wallet> };`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`a promise resolving to true or false depending on whether the auto connect function connected to a wallet or not

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

