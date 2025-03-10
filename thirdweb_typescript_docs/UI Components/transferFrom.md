# transferFrom

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/transferFrom](https://portal.thirdweb.com/references/typescript/v5/erc20/transferFrom)*

* References
* transferFrom

Transfers a specified amount of tokens from one address to another address on the ERC20 contract.

## Example

`import{ transferFrom }from"thirdweb/extensions/erc20";import{ sendTransaction }from"thirdweb";consttransaction=transferFrom({contract:USDC_CONTRACT,from:"0x1234...",to:"0x5678...",amount:100,});awaitsendTransaction({ transaction, account });`
#### Signature

`functiontransferFrom(options:BaseTransactionOptions<TransferFromParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The transaction options including from, to, amount, and gas price.

### Type

`letoptions:BaseTransactionOptions<TransferFromParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

