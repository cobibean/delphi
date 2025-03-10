# getProposalVoteCounts

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/getProposalVoteCounts](https://portal.thirdweb.com/references/typescript/v5/vote/getProposalVoteCounts)*

* References
* getProposalVoteCounts

Get the info about Against, For and Abstain votes of a proposal

## Example

`import{ getProposalVoteCounts }from"thirdweb/extensions/vote";constdata=awaitgetProposalVoteCounts({ contract, proposalId });// Example result{for:12000000000000000000n,// 12 tokens (with a decimals of 18) were used to vote "for"against:7000000000000000000n,// 7 tokens (with a decimals of 18) were used to vote "against"abstain:0n,// no user has voted abstain on this proposal}`
#### Signature

`functiongetProposalVoteCounts(options:BaseTransactionOptions<ProposalVotesParams>,):Promise<ProposalVoteInfo>;`
## Parameters

#### options

### Type

`letoptions:BaseTransactionOptions<ProposalVotesParams>;`
## Returns

#### Return Type

`letreturnType:Promise<ProposalVoteInfo>;`the object containing the info about Against, For and Abstain votes of a proposal
Note: the count is displayed in "wei"

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

