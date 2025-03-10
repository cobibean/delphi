# useSendBatchTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/useSendBatchTransaction](https://portal.thirdweb.com/references/typescript/v5/useSendBatchTransaction)*

* References
* useSendBatchTransaction

A hook to send a transaction.

## Example

`import{ useSendBatchTransaction }from"thirdweb/react";const{mutate:sendBatch,data:transactionResult}=useSendBatchTransaction();// latersendBatch([tx1, tx2]);`
#### Signature

`functionuseSendBatchTransaction():UseMutationResult<{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;},Error,Array<PreparedTransaction>>;`
## Returns

#### Return Type

`letreturnType:UseMutationResult<{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;},Error,Array<PreparedTransaction>>;`A mutation object to send a transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

