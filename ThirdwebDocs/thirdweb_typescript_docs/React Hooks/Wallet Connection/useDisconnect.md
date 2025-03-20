# useDisconnect

*Source: [https://portal.thirdweb.com/references/typescript/v5/useDisconnect](https://portal.thirdweb.com/references/typescript/v5/useDisconnect)*

* References
* useDisconnect

Disconnect from given account

## Example

`import{ useDisconnect, useActiveWallet }from"thirdweb/react";functionExample() {const{disconnect}=useDisconnect();constwallet=useActiveWallet();return(<buttononClick={()=>disconnect(wallet)}>Disconnect</button>);}`
#### Signature

`functionuseDisconnect():{disconnect:(wallet:Wallet)=>void};`
## Returns

#### Return Type

`letreturnType:{disconnect:(wallet:Wallet)=>void};`An object with a function to disconnect an account

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

