# executeProposal

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/executeProposal](https://portal.thirdweb.com/references/typescript/v5/vote/executeProposal)*

* References
* executeProposal

Execute a Proposal

## Example

`import{ executeProposal }from"thirdweb/extensions/vote";consttransaction=executeProposal({ contract, proposalId });consttx=awaitsendTransaction({ transaction, account });`
#### Signature

`functionexecuteProposal(options:BaseTransactionOptions<{proposalId:bigint}>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

### Type

`letoptions:BaseTransactionOptions<{proposalId:bigint}>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`a prepared transaction for theexecutemethod

`execute`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

