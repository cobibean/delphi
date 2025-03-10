# proposalVotes

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/proposalVotes](https://portal.thirdweb.com/references/typescript/v5/vote/proposalVotes)*

* References
* proposalVotes

Calls the "proposalVotes" function on the contract.

## Example

`import{ proposalVotes }from"thirdweb/extensions/vote";constresult=awaitproposalVotes({contract,proposalId:...,});`
#### Signature

`functionproposalVotes(options:BaseTransactionOptions<ProposalVotesParams>,):Promise<readonly[bigint,bigint,bigint]>;`
## Parameters

#### options

The options for the proposalVotes function.

### Type

`letoptions:BaseTransactionOptions<ProposalVotesParams>;`
## Returns

#### Return Type

`letreturnType:Promise<readonly[bigint,bigint,bigint]>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

