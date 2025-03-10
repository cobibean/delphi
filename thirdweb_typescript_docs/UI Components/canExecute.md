# canExecute

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/canExecute](https://portal.thirdweb.com/references/typescript/v5/vote/canExecute)*

* References
* canExecute

Simulate theexecutemethod of the Vote contract, to check if you can execute a proposal

`execute`
## Example

`import{ canExecute }from"thirdweb/extensions/vote";constexecutable=awaitcanExecute({ contract, proposalId });`
#### Signature

`functioncanExecute(options:BaseTransactionOptions<{proposalId:bigint}>,):Promise<boolean>;`
## Parameters

#### options

### Type

`letoptions:BaseTransactionOptions<{proposalId:bigint}>;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`boolean -trueif the proposal is executable, elsefalse

`true``false`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

