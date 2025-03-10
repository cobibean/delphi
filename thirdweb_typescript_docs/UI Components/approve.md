# approve

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/approve](https://portal.thirdweb.com/references/typescript/v5/erc20/approve)*

* References
* approve

Approves the spending of tokens by a specific address.

## Example

`import{ approve }from"thirdweb/extensions/erc20";import{ sendTransaction }from"thirdweb";consttransaction=awaitapprove({contract,spender:"0x...",amount:100,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionapprove(options:BaseTransactionOptions<ApproveParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:BaseTransactionOptions<ApproveParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

