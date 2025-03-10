# useNetworkSwitcherModal

*Source: [https://portal.thirdweb.com/references/typescript/v5/useNetworkSwitcherModal](https://portal.thirdweb.com/references/typescript/v5/useNetworkSwitcherModal)*

* References
* useNetworkSwitcherModal

Hook to open the Wallet Network Switcher Modal that shows allows users to switch to different network.

## Example

`import{ createThirdwebClient }from"thirdweb";import{ useNetworkSwitcherModal }from"thirdweb/react";import{ base, ethereum, polygon, sepolia, arbitrum }from"thirdweb/chains";constclient=createThirdwebClient({clientId:"<your_client_id>",});functionExample() {constnetworkSwitcher=useNetworkSwitcherModal();functionhandleClick() {networkSwitcher.open({client,theme:'light'sections: [{ label:'Recently used', chains: [arbitrum, polygon] },{ label:'Popular', chains: [base, ethereum, sepolia] },]});}return<buttononClick={handleClick}> Switch Network </button>}`
#### Signature

`functionuseNetworkSwitcherModal():{close:()=>void;open:(props:UseNetworkSwitcherModalOptions)=>Promise<void>;};`
## Returns

#### Return Type

`letreturnType:{close:()=>void;open:(props:UseNetworkSwitcherModalOptions)=>Promise<void>;};`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

