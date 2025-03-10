# decimals

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/decimals](https://portal.thirdweb.com/references/typescript/v5/erc20/decimals)*

* References
* decimals

Retrieves the number of decimal places for a given ERC20 contract.

## Example

`import{ decimals }from"thirdweb/extensions/erc20";consttokenDecimals=awaitdecimals({ contract });`
#### Signature

`functiondecimals(options:BaseTransactionOptions):Promise<number>;`
## Parameters

#### options

The options for the transaction.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<number>;`A promise that resolves to the number of decimal places.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

