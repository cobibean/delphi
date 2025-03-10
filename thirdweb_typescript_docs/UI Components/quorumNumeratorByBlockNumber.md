# quorumNumeratorByBlockNumber

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/quorumNumeratorByBlockNumber](https://portal.thirdweb.com/references/typescript/v5/vote/quorumNumeratorByBlockNumber)*

* References
* quorumNumeratorByBlockNumber

Calls the "quorumDenominator" function on the contract with an extra param calledblockNumber.
This extension is similar to thequorumDenominatorextension, except that it takes in a bigint (blockNumber)

`blockNumber``quorumDenominator`
## Example

`import{ quorumNumeratorByBlockNumber }from"thirdweb/extensions/vote";constresult=awaitquorumNumeratorByBlockNumber({contract,blockNumber:13232234232n,});`
#### Signature

`functionquorumNumeratorByBlockNumber(options:BaseTransactionOptions<{blockNumber:bigint}>,):Promise<bigint>;`
## Parameters

#### options

The options for the quorumDenominator function.

### Type

`letoptions:BaseTransactionOptions<{blockNumber:bigint}>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

