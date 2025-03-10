# proposalExists

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/proposalExists](https://portal.thirdweb.com/references/typescript/v5/vote/proposalExists)*

* References
* proposalExists

Check if a proposal exists based on a given proposalId

## Example

`import{ proposalExists }from"thirdweb/extensions/vote";// Check if the proposal with proposalId `4` existsconstexists=awaitproposalExists({ contract, proposalId:4n});// either `true` or `false``
#### Signature

`functionproposalExists(options:BaseTransactionOptions<StateParams>,):Promise<boolean>;`
## Parameters

#### options

### Type

`letoptions:BaseTransactionOptions<StateParams>;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`trueif the proposal exists, elsefalse

`true``false`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

