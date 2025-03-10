# convertFiatToCrypto

*Source: [https://portal.thirdweb.com/typescript/v5/convertFiatToCrypto](https://portal.thirdweb.com/typescript/v5/convertFiatToCrypto)*

Convert a fiat value to a token.
Currently only USD is supported.

## Example

### Basic usage

`import{ convertFiatToCrypto }from"thirdweb/pay";// Convert 2 cents to ETHconstresult=awaitconvertFiatToCrypto({from:"USD",// the token address. For native token, use NATIVE_TOKEN_ADDRESSto:"0x...",// the chain (of the chain where the token belong to)chain: ethereum,// 2 centsfromAmount:0.02,});`Result:{ result: 0.0000057 }

`{ result: 0.0000057 }`
#### Signature

`functionconvertFiatToCrypto(options:ConvertFiatToCryptoParams,):Promise<{result:number}>;`
## Parameters

#### options

### Type

`letoptions:{chain:Chain;client:ThirdwebClient;from:SupportedFiatCurrency;fromAmount:number;to:Address;};`
## Returns

#### Return Type

`letreturnType:Promise<{result:number}>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

