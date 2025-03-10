# getAll

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/getAll](https://portal.thirdweb.com/references/typescript/v5/vote/getAll)*

* References
* getAll

Get all proposals from a Vote contract with some extra info attached for each proposal (current state and votes)

## Example

`import{ getAll }from"thirdweb/extension/getAll";constallProposals=awaitgetAll({ contract });`
#### Signature

`functiongetAll(options:BaseTransactionOptions,):Promise<Array<ProposalItem>>;`
## Parameters

#### options

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:{description:string;endBlock:bigint;executions:Array<{nativeTokenValue:bigint|undefined;toAddress:string|undefined;transactionData:Hex|undefined;}>;proposalId:bigint;proposer:string;startBlock:bigint;state:number;stateLabel:string|undefined;votes:ProposalVoteInfo;};`An array containing proposals data

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

