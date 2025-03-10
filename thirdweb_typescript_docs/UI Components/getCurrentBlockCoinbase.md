# getCurrentBlockCoinbase

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/getCurrentBlockCoinbase](https://portal.thirdweb.com/references/typescript/v5/multicall3/getCurrentBlockCoinbase)*

* References
* getCurrentBlockCoinbase

Calls the "getCurrentBlockCoinbase" function on the contract.

## Example

`import{ getCurrentBlockCoinbase }from"thirdweb/extensions/multicall3";constresult=awaitgetCurrentBlockCoinbase({contract,});`
#### Signature

`functiongetCurrentBlockCoinbase(options:BaseTransactionOptions,):Promise<string>;`
## Parameters

#### options

The options for the getCurrentBlockCoinbase function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

