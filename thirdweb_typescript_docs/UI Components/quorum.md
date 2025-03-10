# quorum

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/quorum](https://portal.thirdweb.com/references/typescript/v5/vote/quorum)*

* References
* quorum

Calls the "quorum" function on the contract.

## Example

`import{ quorum }from"thirdweb/extensions/vote";constresult=awaitquorum({contract,blockNumber:...,});`
#### Signature

`functionquorum(options:BaseTransactionOptions<QuorumParams>,):Promise<bigint>;`
## Parameters

#### options

The options for the quorum function.

### Type

`letoptions:BaseTransactionOptions<QuorumParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

