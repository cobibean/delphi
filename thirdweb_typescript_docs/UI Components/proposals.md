# proposals

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/proposals](https://portal.thirdweb.com/references/typescript/v5/vote/proposals)*

* References
* proposals

Calls the "proposals" function on the contract.

## Example

`import{ proposals }from"thirdweb/extensions/vote";constresult=awaitproposals({contract,key:...,});`
#### Signature

`functionproposals(options:BaseTransactionOptions<ProposalsParams>,):Promise<readonly[bigint,string,bigint,bigint,string]>;`
## Parameters

#### options

The options for the proposals function.

### Type

`letoptions:BaseTransactionOptions<ProposalsParams>;`
## Returns

#### Return Type

`letreturnType:Promise<readonly[bigint,string,bigint,bigint,string]>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

