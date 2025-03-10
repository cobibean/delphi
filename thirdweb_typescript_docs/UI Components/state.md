# state

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/state](https://portal.thirdweb.com/references/typescript/v5/vote/state)*

* References
* state

Calls the "state" function on the contract.

## Example

`import{ state }from"thirdweb/extensions/vote";constresult=awaitstate({contract,proposalId:...,});`
#### Signature

`functionstate(options:BaseTransactionOptions<StateParams>,):Promise<number>;`
## Parameters

#### options

The options for the state function.

### Type

`letoptions:BaseTransactionOptions<StateParams>;`
## Returns

#### Return Type

`letreturnType:Promise<number>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

