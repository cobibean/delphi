# getEthBalance

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/getEthBalance](https://portal.thirdweb.com/references/typescript/v5/multicall3/getEthBalance)*

* References
* getEthBalance

Calls the "getEthBalance" function on the contract.

## Example

`import{ getEthBalance }from"thirdweb/extensions/multicall3";constresult=awaitgetEthBalance({contract,addr:...,});`
#### Signature

`functiongetEthBalance(options:BaseTransactionOptions<GetEthBalanceParams>,):Promise<bigint>;`
## Parameters

#### options

The options for the getEthBalance function.

### Type

`letoptions:BaseTransactionOptions<GetEthBalanceParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

