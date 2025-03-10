# setTransferable

*Source: [https://portal.thirdweb.com/references/typescript/v5/transferableerc721/setTransferable](https://portal.thirdweb.com/references/typescript/v5/transferableerc721/setTransferable)*

* References
* setTransferable

Prepares a transaction to call the "setTransferable" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ TransferableERC721 }from"thirdweb/modules";consttransaction=TransferableERC721.setTransferable({contract,enableTransfer:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetTransferable(options:BaseTransactionOptions<|SetTransferableParams|{asyncParams:()=>Promise<SetTransferableParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setTransferable" function.

### Type

`letoptions:BaseTransactionOptions<|SetTransferableParams|{asyncParams:()=>Promise<SetTransferableParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

