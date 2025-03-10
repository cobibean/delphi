# createWalletConnectSession

*Source: [https://portal.thirdweb.com/references/typescript/v5/createWalletConnectSession](https://portal.thirdweb.com/references/typescript/v5/createWalletConnectSession)*

* References
* createWalletConnectSession

Initiates a new WalletConnect session for interacting with another application.

## Example

`import{createWalletConnectClient,createWalletConnectSession,}from"thirdweb/wallets";constclient=awaitcreateWalletConnectClient({wallet: wallet,client: client,});constsession=createWalletConnectSession({walletConnectClient: client,uri:"wc:...",});`
#### Signature

`functioncreateWalletConnectSession(options:CreateWalletConnectSessionOptions,):void;`
## Parameters

#### options

The options to use to create the WalletConnect session.

### Type

`letoptions:CreateWalletConnectSessionOptions;`
## Returns

#### Return Type

`letreturnType:void;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

