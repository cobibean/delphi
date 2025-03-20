# useAutoConnect

*Source: [https://portal.thirdweb.com/references/typescript/v5/useAutoConnect](https://portal.thirdweb.com/references/typescript/v5/useAutoConnect)*

* References
* useAutoConnect

Autoconnect the last previously connected wallet.

## Example

`import{ useAutoConnect }from"thirdweb/react";const{data:autoConnected,isLoading}=useAutoConnect({client,accountAbstraction,wallets,onConnect,timeout,});`
#### Signature

`functionuseAutoConnect(props:AutoConnectProps,):UseQueryResult<boolean,Error>;`
## Parameters

#### props

The props for auto connect.

### Type

`letprops:{accountAbstraction?:SmartWalletOptions;appMetadata?:AppMetadata;chain?:Chain;client:ThirdwebClient;onConnect?:(wallet:Wallet)=>void;onTimeout?:()=>void;timeout?:number;wallets?:Array<Wallet>;};`
## Returns

#### Return Type

`letreturnType:UseQueryResult<boolean,Error>;`whether the auto connect was successful.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

