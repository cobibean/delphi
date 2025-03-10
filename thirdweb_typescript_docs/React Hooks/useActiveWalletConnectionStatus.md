# useActiveWalletConnectionStatus

*Source: [https://portal.thirdweb.com/references/typescript/v5/useActiveWalletConnectionStatus](https://portal.thirdweb.com/references/typescript/v5/useActiveWalletConnectionStatus)*

* References
* useActiveWalletConnectionStatus

A hook that returns the active account's connection status.

## Example

`import{ useActiveWalletConnectionStatus }from"thirdweb/react";functionExample() {conststatus=useActiveWalletConnectionStatus();console.log(status);return<div> ... </div>;}`
#### Signature

`functionuseActiveWalletConnectionStatus():ConnectionStatus;`
## Returns

#### Return Type

`letreturnType:|"connected"|"disconnected"|"connecting"|"unknown";`The active wallet's connection status.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

