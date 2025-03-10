# useBuyWithCryptoStatus

*Source: [https://portal.thirdweb.com/references/typescript/v5/useBuyWithCryptoStatus](https://portal.thirdweb.com/references/typescript/v5/useBuyWithCryptoStatus)*

* References
* useBuyWithCryptoStatus

A hook to get a status of a "Buy with crypto" transaction to determine if the transaction is completed, failed or pending.

This hook is a React Query wrapper of thegetBuyWithCryptoStatusfunction.
You can also use that function directly.

`getBuyWithCryptoStatus`
## Example

`import{useSendTransaction,useBuyWithCryptoQuote,useBuyWithCryptoStatus,typeBuyWithCryptoStatusQueryParams,useActiveAccount,}from"thirdweb/react";import{ sendTransaction }from"thirdweb";functionComponent() {constbuyWithCryptoQuoteQuery=useBuyWithCryptoQuote(swapParams);const[buyTxHash,setBuyTxHash]=useState<BuyWithCryptoStatusQueryParams|undefined>();constbuyWithCryptoStatusQuery=useBuyWithCryptoStatus(buyTxHash?{client,transactionHash: buyTxHash,}:undefined,);constaccount=useActiveAccount();asyncfunctionhandleBuyWithCrypto() {// if approval is requiredif(buyWithCryptoQuoteQuery.data.approval) {constapproveTx=awaitsendTransaction({account: account,transaction: swapQuote.data.approval,});awaitwaitForApproval(approveTx);}// send the transaction to buy crypto// this promise is resolved when user confirms the transaction in the wallet and the transaction is sent to the blockchainconstbuyTx=awaitsendTransactionMutation.mutateAsync({transaction: swapQuote.data.transactionRequest,account: account,});awaitwaitForApproval(buyTx);// set buyTx.transactionHash to poll the status of the swap transactionsetBuyWithCryptoTx(buyTx.transactionHash);}return<buttononClick={handleBuyWithCrypto}>Swap</button>;}`
#### Signature

`functionuseBuyWithCryptoStatus(params?:BuyWithCryptoTransaction,):UseQueryResult<BuyWithCryptoStatus,Error>;`
## Parameters

#### params

object of typeBuyWithCryptoTransaction

`BuyWithCryptoTransaction`
### Type

`letparams:{chainId:number;client:ThirdwebClient;transactionHash:string;};`
## Returns

#### Return Type

`letreturnType:UseQueryResult<BuyWithCryptoStatus,Error>;`A react query object which contains the data of typeBuyWithCryptoStatus

`BuyWithCryptoStatus`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

