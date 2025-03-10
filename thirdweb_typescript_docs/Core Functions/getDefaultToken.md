# getDefaultToken

*Source: [https://portal.thirdweb.com/references/typescript/v5/getDefaultToken](https://portal.thirdweb.com/references/typescript/v5/getDefaultToken)*

* References
* getDefaultToken

Get the default token for a given chain and symbol

## Example

`import{ getDefaultToken }from"thirdweb/react";import{ ethereum }from"thirdweb/chains";consttoken=getDefaultToken(ethereum,"USDC");`
#### Signature

`functiongetDefaultToken(chain:Readonly,symbol:|"WETH"|"USDT"|"USDC"|"WBTC"|"WMATIC"|"WBNB"|"BUSD"|"WFTM"|"WAVAX",):undefined|TokenInfo;`
## Parameters

#### chain

The chain to get the token for

### Type

`letchain:Readonly;`
#### symbol

The symbol of the token to get

### Type

`letsymbol:|"WETH"|"USDT"|"USDC"|"WBTC"|"WMATIC"|"WBNB"|"BUSD"|"WFTM"|"WAVAX";`
## Returns

#### Return Type

`letreturnType:undefined|TokenInfo;`The default token for the given chain and symbol

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

