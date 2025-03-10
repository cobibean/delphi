# mintAdditionalSupplyTo

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/mintAdditionalSupplyTo](https://portal.thirdweb.com/references/typescript/v5/erc1155/mintAdditionalSupplyTo)*

* References
* mintAdditionalSupplyTo

Mints a "supply" number of additional ERC1155 tokens to the specified "to" address.

## Example

`import{ mintAdditionalSupplyTo }from"thirdweb/extensions/erc1155";import{ sendTransaction }from"thirdweb";consttransaction=mintAdditionalSupplyTo({contract,to:"0x...",tokenId:1n,supply:10n,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionmintAdditionalSupplyTo(options:BaseTransactionOptions<MintAdditionalSupplyToParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:BaseTransactionOptions<MintAdditionalSupplyToParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the transaction result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

