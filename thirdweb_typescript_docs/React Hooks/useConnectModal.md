# useConnectModal

*Source: [https://portal.thirdweb.com/references/typescript/v5/useConnectModal](https://portal.thirdweb.com/references/typescript/v5/useConnectModal)*

* References
* useConnectModal

hook that allows you to open the Connect UI in a Modal to prompt the user to connect wallet.

## Example

`import{ createThirdwebClient }from"thirdweb";import{ useConnectModal }from"thirdweb/react";constclient=createThirdwebClient({clientId:"<your_client_id>",});functionExample() {const{connect,isConnecting}=useConnectModal();asyncfunctionhandleConnect() {constwallet=awaitconnect({ client });// opens the connect modalconsole.log("connected to", wallet);}return<buttononClick={handleConnect}> Connect </button>;}`The returnedconnectmethod takes an object of typeUseConnectModalOptionsas an argument to customize the Connect Modal UI. Refer toUseConnectModalOptionsto see the available options.

`connect`
#### Signature

`functionuseConnectModal():{connect:(props:UseConnectModalOptions)=>Promise<Wallet>;isConnecting:boolean;};`
## Returns

#### Return Type

`letreturnType:{connect:(props:UseConnectModalOptions)=>Promise<Wallet>;isConnecting:boolean;};`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

