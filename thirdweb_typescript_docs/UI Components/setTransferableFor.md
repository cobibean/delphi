# setTransferableFor

*Source: [https://portal.thirdweb.com/references/typescript/v5/transferableerc721/setTransferableFor](https://portal.thirdweb.com/references/typescript/v5/transferableerc721/setTransferableFor)*

* References
* setTransferableFor

Prepares a transaction to call the "setTransferableFor" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ TransferableERC721 }from"thirdweb/modules";consttransaction=TransferableERC721.setTransferableFor({contract,target:...,enableTransfer:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetTransferableFor(options:BaseTransactionOptions<|SetTransferableForParams|{asyncParams:()=>Promise<SetTransferableForParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setTransferableFor" function.

### Type

`letoptions:BaseTransactionOptions<|SetTransferableForParams|{asyncParams:()=>Promise<SetTransferableForParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

