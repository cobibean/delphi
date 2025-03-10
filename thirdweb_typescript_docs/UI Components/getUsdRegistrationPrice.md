# getUsdRegistrationPrice

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/getUsdRegistrationPrice](https://portal.thirdweb.com/references/typescript/v5/farcaster/getUsdRegistrationPrice)*

* References
* getUsdRegistrationPrice

Retrieves the current cost to register a Farcaster fid in USD.

## Example

`import{ getUsdRegistrationPrice }from"thirdweb/extensions/farcaster";constprice=awaitgetUsdRegistrationPrice({client,});`
#### Signature

`functiongetUsdRegistrationPrice(options:GetUsdRegistrationPriceParams,):Promise<number>;`
## Parameters

#### options

An object containing a client to use to fetch the price and the amount of extra storage to include in the returned price.

### Type

`letoptions:{chain?:Chain;client:ThirdwebClient;disableCache?:boolean;extraStorage?:bigint|number|string;};`
## Returns

#### Return Type

`letreturnType:Promise<number>;`A promise that resolves to the current cost of a Farcaster fid in USD.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

