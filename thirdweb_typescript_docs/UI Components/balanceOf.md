# balanceOf

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/balanceOf](https://portal.thirdweb.com/references/typescript/v5/erc20/balanceOf)*

* References
* balanceOf

Calls the "balanceOf" function on the contract.

## Example

`import{ balanceOf }from"thirdweb/extensions/erc20";constresult=awaitbalanceOf({contract,address:...,});`
#### Signature

`functionbalanceOf(options:BaseTransactionOptions<BalanceOfParams>,):Promise<bigint>;`
## Parameters

#### options

The options for the balanceOf function.

### Type

`letoptions:BaseTransactionOptions<BalanceOfParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

