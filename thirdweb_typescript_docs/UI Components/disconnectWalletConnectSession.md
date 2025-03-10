# disconnectWalletConnectSession

*Source: [https://portal.thirdweb.com/references/typescript/v5/disconnectWalletConnectSession](https://portal.thirdweb.com/references/typescript/v5/disconnectWalletConnectSession)*

* References
* disconnectWalletConnectSession

Disconnects a WalletConnect session.

## Example

`import{ disconnectWalletConnectSession }from"thirdweb/wallets";awaitdisconnectWalletConnectSession({session: mySession,walletConnectClient: wcClient,});`
#### Signature

`functiondisconnectWalletConnectSession(options:{session:WalletConnectSession;walletConnectClient:SignClient;}):Promise<void>;`
## Parameters

#### options

The options to use to disconnect the WalletConnect session.

### Type

`letoptions:{session:WalletConnectSession;walletConnectClient:SignClient;};`
## Returns

#### Return Type

`letreturnType:Promise<void>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

