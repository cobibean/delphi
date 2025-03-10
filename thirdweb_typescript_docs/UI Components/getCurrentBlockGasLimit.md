# getCurrentBlockGasLimit

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/getCurrentBlockGasLimit](https://portal.thirdweb.com/references/typescript/v5/multicall3/getCurrentBlockGasLimit)*

* References
* getCurrentBlockGasLimit

Calls the "getCurrentBlockGasLimit" function on the contract.

## Example

`import{ getCurrentBlockGasLimit }from"thirdweb/extensions/multicall3";constresult=awaitgetCurrentBlockGasLimit({contract,});`
#### Signature

`functiongetCurrentBlockGasLimit(options:BaseTransactionOptions,):Promise<bigint>;`
## Parameters

#### options

The options for the getCurrentBlockGasLimit function.

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

