# sendCalls

*Source: [https://portal.thirdweb.com/references/typescript/v5/eip5792/sendCalls](https://portal.thirdweb.com/references/typescript/v5/eip5792/sendCalls)*

* References
* sendCalls

SendEIP-5792calls to a wallet.
This function works with all Thirdweb wallets (in-app and smart) and certain injected wallets that already support EIP-5792.
Transactions will be bundled and sponsored when those capabilities are supported, otherwise they will be sent as individual transactions.

This function is dependent on the wallet's support for EIP-5792 and could fail.

* getCallsStatus for how to retrieve the status of the bundle.
* getCapabilities for how to retrieve the capabilities of the wallet.

getCallsStatus for how to retrieve the status of the bundle.

getCapabilities for how to retrieve the capabilities of the wallet.

## Example

`import{ createThirdwebClient }from"thirdweb";import{ sendCalls }from"thirdweb/wallets/eip5792";constclient=createThirdwebClient({ clientId:...});constwallet=createWallet("com.coinbase.wallet");constsendTx1=approve({contract:USDT_CONTRACT,amount:100,spender:"0x33d9B8BEfE81027E2C859EDc84F5636cbb202Ed6",});constsendTx2=approve({contract:USDT_CONTRACT,amount:100,spender:"0x2a4f24F935Eb178e3e7BA9B53A5Ee6d8407C0709",});constbundleId=awaitsendCalls({wallet,client,calls: [sendTx1, sendTx2],});`Sponsor transactions with a paymaster:

`constbundleId=awaitsendCalls({wallet,client,calls: [send1, send2],capabilities: {paymasterService: {url:`https://${CHAIN.id}.bundler.thirdweb.com/${client.clientId}`}}});We recommend proxying any paymaster calls via anAPIroute you setup and control.`
#### Signature

`functionsendCalls(options:SendCallsOptions<ID>):Promise<string>;`
## Parameters

#### options

### Type

`letoptions:SendCallsOptions<ID>;`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The ID of the bundle of the calls.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

