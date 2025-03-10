# getCurrencyMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/getCurrencyMetadata](https://portal.thirdweb.com/references/typescript/v5/erc20/getCurrencyMetadata)*

* References
* getCurrencyMetadata

Retrieves the metadata of a currency.

## Example

`import{ getCurrencyMetadata }from"thirdweb/extensions/erc20";constcurrencyMetadata=awaitgetCurrencyMetadata({ contract });`
#### Signature

`functiongetCurrencyMetadata(options:BaseTransactionOptions,):Promise<GetCurrencyMetadataResult>;`
## Parameters

#### options

The options for the transaction.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:{decimals:number;name:string;symbol:string};`A promise that resolves to an object containing the currency metadata.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

