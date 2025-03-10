# getAllProposals

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/getAllProposals](https://portal.thirdweb.com/references/typescript/v5/vote/getAllProposals)*

* References
* getAllProposals

Calls the "getAllProposals" function on the contract.

## Example

`import{ getAllProposals }from"thirdweb/extensions/vote";constresult=awaitgetAllProposals({contract,});`
#### Signature

`functiongetAllProposals(options:BaseTransactionOptions):Promise<readonlyArray<{calldatas:readonlyArray<`0x${string}`>;description:string;endBlock:bigint;proposalId:bigint;proposer:string;signatures:readonlyArray<string>;startBlock:bigint;targets:readonlyArray<string>;values:readonlyArray<bigint> }>>`
## Parameters

#### options

The options for the getAllProposals function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<readonlyArray<{calldatas:readonlyArray<`0x${string}`>;description:string;endBlock:bigint;proposalId:bigint;proposer:string;signatures:readonlyArray<string>;startBlock:bigint;targets:readonlyArray<string>;values:readonlyArray<bigint> }>>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

