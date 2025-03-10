# useWalletDetailsModal

*Source: [https://portal.thirdweb.com/references/typescript/v5/useWalletDetailsModal](https://portal.thirdweb.com/references/typescript/v5/useWalletDetailsModal)*

* References
* useWalletDetailsModal

Hook to open the Wallet Details Modal that shows various information about the connected wallet and allows users to perform various actions like sending funds, receiving funds, switching networks, Buying tokens, etc.

## Example

### Basic usage

`import{ createThirdwebClient }from"thirdweb";import{ useWalletDetailsModal }from"thirdweb/react";constclient=createThirdwebClient({clientId:"<your_client_id>",});functionExample() {constdetailsModal=useWalletDetailsModal();functionhandleClick() {detailsModal.open({ client, theme:"light"});}return<buttononClick={handleClick}> Show Wallet Details </button>;}`
### Callback for when the modal is closed

`detailsModal.open({client,onClose: (screen:string)=>console.log({ screen }),});`
#### Signature

`functionuseWalletDetailsModal():{open:(props:UseWalletDetailsModalOptions)=>void;};`
## Returns

#### Return Type

`letreturnType:{open:(props:UseWalletDetailsModalOptions)=>void;};`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

