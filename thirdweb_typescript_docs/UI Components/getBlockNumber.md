# getBlockNumber

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/getBlockNumber](https://portal.thirdweb.com/references/typescript/v5/multicall3/getBlockNumber)*

* References
* getBlockNumber

Calls the "getBlockNumber" function on the contract.

## Example

`import{ getBlockNumber }from"thirdweb/extensions/multicall3";constresult=awaitgetBlockNumber({contract,});`
#### Signature

`functiongetBlockNumber(options:BaseTransactionOptions,):Promise<bigint>;`
## Parameters

#### options

The options for the getBlockNumber function.

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

