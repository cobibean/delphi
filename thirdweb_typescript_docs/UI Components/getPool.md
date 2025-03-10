# getPool

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/getPool](https://portal.thirdweb.com/references/typescript/v5/uniswap/getPool)*

* References
* getPool

Calls the "getPool" function on the contract.

## Example

`import{ getPool }from"thirdweb/extensions/uniswap";constresult=awaitgetPool({contract,tokenA:...,tokenB:...,fee:...,});`
#### Signature

`functiongetPool(options:BaseTransactionOptions<GetPoolParams>,):Promise<string>;`
## Parameters

#### options

The options for the getPool function.

### Type

`letoptions:BaseTransactionOptions<GetPoolParams>;`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

