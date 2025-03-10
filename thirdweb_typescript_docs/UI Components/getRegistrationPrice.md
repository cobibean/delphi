# getRegistrationPrice

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/getRegistrationPrice](https://portal.thirdweb.com/references/typescript/v5/farcaster/getRegistrationPrice)*

* References
* getRegistrationPrice

Retrieves the current cost to register a Farcaster fid in wei.

## Example

`import{ getRegistrationPrice }from"thirdweb/extensions/farcaster";constprice=awaitgetRegistrationPrice({client,});`
#### Signature

`functiongetRegistrationPrice(options:GetRegistrationPriceParams,):Promise<bigint>;`
## Parameters

#### options

An object containing a client to use to fetch the price and the amount of extra storage to include in the returned price.

### Type

`letoptions:{chain?:Chain;client:ThirdwebClient;disableCache?:boolean;extraStorage?:bigint|number|string;};`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the current cost of a Farcaster fid in wei.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

