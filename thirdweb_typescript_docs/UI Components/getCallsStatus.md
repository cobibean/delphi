# getCallsStatus

*Source: [https://portal.thirdweb.com/references/typescript/v5/eip5792/getCallsStatus](https://portal.thirdweb.com/references/typescript/v5/eip5792/getCallsStatus)*

* References
* getCallsStatus

Get the status of anEIP-5792bundle.

This function is dependent on the wallet's support for EIP-5792 and could fail.

## Example

`import{ createThirdwebClient }from"thirdweb";import{ sendCalls, getCallsStatus }from"thirdweb/wallets/eip5792";constclient=createThirdwebClient({ clientId:...});constbundleId=awaitsendCalls({ wallet, client, calls });letresult;while(result.status!=="CONFIRMED") {result=awaitgetCallsStatus({ wallet, client, bundleId });}`
#### Signature

`functiongetCallsStatus(options:GetCallsStatusOptions,):Promise<GetCallsStatusResponse>;`
## Parameters

#### options

### Type

`letoptions:{bundleId:WalletSendCallsId;client:ThirdwebClient;wallet:Wallet;};`
## Returns

#### Return Type

`letreturnType:{receipts:Array<WalletCallReceipt<bigint,"success"|"reverted">>;status:"PENDING"|"CONFIRMED";};`
* A promise that resolves to the bundle's status and receipts (if available). GetCallsStatusResponse

A promise that resolves to the bundle's status and receipts (if available). GetCallsStatusResponse

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

