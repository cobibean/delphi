# setProposalThreshold

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/setProposalThreshold](https://portal.thirdweb.com/references/typescript/v5/vote/setProposalThreshold)*

* References
* setProposalThreshold

Prepares a transaction to call the "setProposalThreshold" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setProposalThreshold }from"thirdweb/extensions/vote";consttransaction=setProposalThreshold({contract,newProposalThreshold:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetProposalThreshold(options:BaseTransactionOptions<|SetProposalThresholdParams|{asyncParams:()=>Promise<SetProposalThresholdParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setProposalThreshold" function.

### Type

`letoptions:BaseTransactionOptions<|SetProposalThresholdParams|{asyncParams:()=>Promise<SetProposalThresholdParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

