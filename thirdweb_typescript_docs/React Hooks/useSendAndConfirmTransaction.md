# useSendAndConfirmTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/useSendAndConfirmTransaction](https://portal.thirdweb.com/references/typescript/v5/useSendAndConfirmTransaction)*

* References
* useSendAndConfirmTransaction

A hook to send a transaction.

## Example

`import{ useSendAndConfirmTransaction }from"thirdweb/react";const{mutate:sendAndConfirmTx,data:transactionReceipt}=useSendAndConfirmTransaction();// latersendAndConfirmTx(tx);`
### Gasless usage withthirdweb Engine

`import{ useSendAndConfirmTransaction }from"thirdweb/react";constmutation=useSendAndConfirmTransaction({gasless: {provider:"engine",relayerUrl:"https://thirdweb.engine-***.thirdweb.com/relayer/***",relayerForwarderAddress:"0x...",},});`
### Gasless usage with OpenZeppelin

`import{ useSendAndConfirmTransaction }from"thirdweb/react";constmutation=useSendAndConfirmTransaction({gasless: {provider:"openzeppelin",relayerUrl:"https://...",relayerForwarderAddress:"0x...",},});`
#### Signature

`functionuseSendAndConfirmTransaction(config:SendAndConfirmTransactionConfig,):UseMutationResult<TransactionReceipt,Error,PreparedTransaction>;`
## Parameters

#### config

### Type

`letconfig:SendAndConfirmTransactionConfig;`
## Returns

#### Return Type

`letreturnType:UseMutationResult<TransactionReceipt,Error,PreparedTransaction>;`A mutation object to send a transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

