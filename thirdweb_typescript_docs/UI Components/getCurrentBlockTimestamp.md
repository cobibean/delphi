# getCurrentBlockTimestamp

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/getCurrentBlockTimestamp](https://portal.thirdweb.com/references/typescript/v5/multicall3/getCurrentBlockTimestamp)*

* References
* getCurrentBlockTimestamp

Calls the "getCurrentBlockTimestamp" function on the contract.

## Example

`import{ getCurrentBlockTimestamp }from"thirdweb/extensions/multicall3";constresult=awaitgetCurrentBlockTimestamp({contract,});`
#### Signature

`functiongetCurrentBlockTimestamp(options:BaseTransactionOptions,):Promise<bigint>;`
## Parameters

#### options

The options for the getCurrentBlockTimestamp function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

