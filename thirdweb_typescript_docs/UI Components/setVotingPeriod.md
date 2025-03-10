# setVotingPeriod

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/setVotingPeriod](https://portal.thirdweb.com/references/typescript/v5/vote/setVotingPeriod)*

* References
* setVotingPeriod

Prepares a transaction to call the "setVotingPeriod" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setVotingPeriod }from"thirdweb/extensions/vote";consttransaction=setVotingPeriod({contract,newVotingPeriod:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetVotingPeriod(options:BaseTransactionOptions<|SetVotingPeriodParams|{asyncParams:()=>Promise<SetVotingPeriodParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setVotingPeriod" function.

### Type

`letoptions:BaseTransactionOptions<|SetVotingPeriodParams|{asyncParams:()=>Promise<SetVotingPeriodParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

