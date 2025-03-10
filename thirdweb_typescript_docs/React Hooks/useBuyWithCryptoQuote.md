# useBuyWithCryptoQuote

*Source: [https://portal.thirdweb.com/references/typescript/v5/useBuyWithCryptoQuote](https://portal.thirdweb.com/references/typescript/v5/useBuyWithCryptoQuote)*

* References
* useBuyWithCryptoQuote

Hook to get a price quote for performing a "Buy with crypto" transaction that allows users to buy a token with another token - aka a swap.

The price quote is an object of typeBuyWithCryptoQuote.
This quote contains the information about the purchase such as token amounts, processing fees, estimated time etc.

`BuyWithCryptoQuote`This hook is a React Query wrapper of thegetBuyWithCryptoQuotefunction.
You can also use that function directly

`getBuyWithCryptoQuote`Once you have the quote, you can use theuseSendTransactionfunction to send the purchase
anduseBuyWithCryptoStatusfunction to get the status of the swap transaction.

`useSendTransaction``useBuyWithCryptoStatus`
## Example

`import{useBuyWithCryptoQuote,useBuyWithCryptoStatus,typeBuyWithCryptoStatusQueryParams,useActiveAccount,}from"thirdweb/react";import{ sendTransaction }from"thirdweb";functionComponent() {constbuyWithCryptoQuoteQuery=useBuyWithCryptoQuote(swapParams);const[buyTxHash,setBuyTxHash]=useState<BuyWithCryptoStatusQueryParams|undefined>();constbuyWithCryptoStatusQuery=useBuyWithCryptoStatus(buyTxHash?{client,transactionHash: buyTxHash,}:undefined,);asyncfunctionhandleBuyWithCrypto() {constaccount=useActiveAccount();// if approval is requiredif(buyWithCryptoQuoteQuery.data.approval) {constapproveTx=awaitsendTransaction({transaction: swapQuote.data.approval,account: account,});awaitwaitForApproval(approveTx);}// send the transaction to buy crypto// this promise is resolved when user confirms the transaction in the wallet and the transaction is sent to the blockchainconstbuyTx=awaitsendTransaction({transaction: swapQuote.data.transactionRequest,account: account,});awaitwaitForApproval(buyTx);// set buyTx.transactionHash to poll the status of the swap transactionsetBuyWithCryptoTx(buyTx.transactionHash);}return<buttononClick={handleBuyWithCrypto}>Swap</button>;}`
#### Signature

`functionuseBuyWithCryptoQuote(params?:GetBuyWithCryptoQuoteParams,queryParams?:BuyWithCryptoQuoteQueryOptions,):UseQueryResult<BuyWithCryptoQuote>;`
## Parameters

#### params

object of typeBuyWithCryptoQuoteQueryParams

`BuyWithCryptoQuoteQueryParams`
### Type

`letparams:{client:ThirdwebClient;fromAddress:string;fromChainId:number;fromTokenAddress:string;intentId?:string;maxSlippageBPS?:number;purchaseData?:object;toAddress:string;toChainId:number;toTokenAddress:string;}&(|{fromAmount:string;toAmount?:never}|{fromAmount?:never;toAmount:string});`
#### queryParams

options to configure the react query

### Type

`letqueryParams:BuyWithCryptoQuoteQueryOptions;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<BuyWithCryptoQuote>;`A React Query object which contains the data of typeBuyWithCryptoQuote

`BuyWithCryptoQuote`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

