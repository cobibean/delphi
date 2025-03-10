# convertCryptoToFiat

*Source: [https://portal.thirdweb.com/references/typescript/v5/convertCryptoToFiat](https://portal.thirdweb.com/references/typescript/v5/convertCryptoToFiat)*

* References
* convertCryptoToFiat

Get a price of a token (using tokenAddress + chainId) in fiat.
Only USD is supported at the moment.

## Example

### Basic usage

For native token (non-ERC20), you should use NATIVE_TOKEN_ADDRESS as the value fortokenAddress

`tokenAddress``import{ convertCryptoToFiat }from"thirdweb/pay";// Get Ethereum priceconstresult=convertCryptoToFiat({fromTokenAddress:NATIVE_TOKEN_ADDRESS,to:"USD",chain: ethereum,fromAmount:1,});// Result: `{ result: 3404.11 }``
#### Signature

`functionconvertCryptoToFiat(options:ConvertCryptoToFiatParams,):Promise<{result:number}>;`
## Parameters

#### options

### Type

`letoptions:{chain:Chain;client:ThirdwebClient;fromAmount:number;fromTokenAddress:Address;to:SupportedFiatCurrency;};`
## Returns

#### Return Type

`letreturnType:Promise<{result:number}>;`a number representing the price (in selected fiat) of "x" token, with "x" being thefromAmount.

`fromAmount`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

