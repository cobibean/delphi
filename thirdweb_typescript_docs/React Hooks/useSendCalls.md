# useSendCalls

*Source: [https://portal.thirdweb.com/references/typescript/v5/eip5792/useSendCalls](https://portal.thirdweb.com/references/typescript/v5/eip5792/useSendCalls)*

* References
* useSendCalls

A hook to sendEIP-5792calls to a wallet.
This hook works with all Thirdweb wallets (in-app and smart) and certain injected wallets that already support EIP-5792.
Transactions will be bundled and sponsored when those capabilities are supported, otherwise they will be sent as individual transactions.

When calls are sent, all contracts that are interacted with will have their corresponding reads revalidated via React Query.

This hook is dependent on the wallet's support for EIP-5792 and could fail.
The mutatuon function will use your currently connected wallet by default, but you can pass it a specific wallet to use if you'd like.

## Example

`import{ useSendCalls }from"thirdweb/react";constsendTx1=approve({contract:USDT_CONTRACT,amount:100,spender:"0x33d9B8BEfE81027E2C859EDc84F5636cbb202Ed6",});constsendTx2=approve({contract:USDT_CONTRACT,amount:100,spender:"0x2a4f24F935Eb178e3e7BA9B53A5Ee6d8407C0709",});const{mutate:sendCalls,data:bundleId}=useSendCalls({client,});awaitsendCalls({wallet,client,calls: [sendTx1, sendTx2],});`Await the bundle's full confirmation:

`const{mutate:sendCalls,data:bundleId}=useSendCalls({client,waitForResult:true,});awaitsendCalls({wallet,client,calls: [sendTx1, sendTx2],});`Sponsor transactions with a paymaster:

`const{mutate:sendCalls,data:bundleId}=useSendCalls();awaitsendCalls({client,calls: [sendTx1, sendTx2],capabilities: {paymasterService: {url:`https://${CHAIN.id}.bundler.thirdweb.com/${client.clientId}`,},},});`We recommend proxying any paymaster calls via an API route you setup and control.

#### Signature

`functionuseSendCalls(__namedParameters:{client:ThirdwebClient;waitForResult?:boolean;}):UseMutationResult<string|GetCallsStatusResponse,Error,Omit<SendCallsOptions,"chain"|"wallet">&{wallet?:Wallet}>;`
## Parameters

#### __namedParameters

### Type

`let__namedParameters:{client:ThirdwebClient;waitForResult?:boolean;};`
## Returns

#### Return Type

`letreturnType:UseMutationResult<string|GetCallsStatusResponse,Error,Omit<SendCallsOptions,"chain"|"wallet">&{wallet?:Wallet}>;`A React Query mutatuon object to interact with sendCalls

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

