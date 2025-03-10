# getStoragePrice

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/getStoragePrice](https://portal.thirdweb.com/references/typescript/v5/farcaster/getStoragePrice)*

* References
* getStoragePrice

Retrieves the current cost to register a Farcaster fid in wei.

## Example

`import{ getStoragePrice }from"thirdweb/extensions/farcaster";constprice=awaitgetStoragePrice({client,});`
#### Signature

`functiongetStoragePrice(options:GetStoragePriceParams,):Promise<bigint>;`
## Parameters

#### options

An object containing a client to use to fetch the price and the amount of extra storage to include in the returned price.

### Type

`letoptions:{chain?:Chain;client:ThirdwebClient;disableCache?:boolean;units?:bigint|number|string;};`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the current cost of a Farcaster fid in USD.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

