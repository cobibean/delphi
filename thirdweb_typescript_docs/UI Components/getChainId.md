# getChainId

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/getChainId](https://portal.thirdweb.com/references/typescript/v5/multicall3/getChainId)*

* References
* getChainId

Calls the "getChainId" function on the contract.

## Example

`import{ getChainId }from"thirdweb/extensions/multicall3";constresult=awaitgetChainId({contract,});`
#### Signature

`functiongetChainId(options:BaseTransactionOptions):Promise<bigint>;`
## Parameters

#### options

The options for the getChainId function.

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

