# mintTo

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/mintTo](https://portal.thirdweb.com/references/typescript/v5/erc20/mintTo)*

* References
* mintTo

Mints a specified amount of tokens to a given address.

## Example

`import{ mintTo }from"thirdweb/extensions/erc20";import{ sendTransaction }from"thirdweb";consttransaction=mintTo({contract,to:"0x...",amount:100,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionmintTo(options:BaseTransactionOptions<MintToParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for minting tokens.

### Type

`letoptions:BaseTransactionOptions<MintToParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

