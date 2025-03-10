# getUsdStoragePrice

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/getUsdStoragePrice](https://portal.thirdweb.com/references/typescript/v5/farcaster/getUsdStoragePrice)*

* References
* getUsdStoragePrice

Retrieves the current cost to register a Farcaster fid in USD.

## Example

`import{ getUsdStoragePrice }from"thirdweb/extensions/farcaster";constprice=awaitgetUsdStoragePrice({client,});`
#### Signature

`functiongetUsdStoragePrice(options:GetUsdStoragePriceParams,):Promise<number>;`
## Parameters

#### options

An object containing a client to use to fetch the price and the amount of extra storage to include in the returned price.

### Type

`letoptions:{chain?:Chain;client:ThirdwebClient;disableCache?:boolean;units?:bigint|number|string;};`
## Returns

#### Return Type

`letreturnType:Promise<number>;`A promise that resolves to the current cost of a Farcaster fid in USD.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

