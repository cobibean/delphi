# getUniswapV3Pool

*Source: [https://portal.thirdweb.com/references/typescript/v5/uniswap/getUniswapV3Pool](https://portal.thirdweb.com/references/typescript/v5/uniswap/getUniswapV3Pool)*

* References
* getUniswapV3Pool

Finds the Uniswap V3 pools for the two tokens.

## Example

`import{ getUniswapV3Pool }from"thirdweb/extensions/uniswap";constpools=awaitgetUniswapV3Pool({tokenA:"0x...",tokenB:"0x...",contract: factoryContract,});`
#### Signature

`functiongetUniswapV3Pool(options:BaseTransactionOptions<GetUniswapV3PoolParams>,):Promise<Array<GetUniswapV3PoolResult>>;`
## Parameters

#### options

The token pair to find any pools for any Uniswap contract that implements getPool.

### Type

`letoptions:BaseTransactionOptions<GetUniswapV3PoolParams>;`
## Returns

#### Return Type

`letreturnType:{poolAddress:Address;poolFee:(typeofUniswapFee)[keyoftypeofUniswapFee];};`The pools' addresses and fees.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

