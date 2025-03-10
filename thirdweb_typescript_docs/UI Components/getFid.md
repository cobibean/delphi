# getFid

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/getFid](https://portal.thirdweb.com/references/typescript/v5/farcaster/getFid)*

* References
* getFid

Retrieves the current fid for an account.

## Example

`import{ getFid }from"thirdweb/extensions/farcaster";constprice=awaitgetFid({client,address,});`
#### Signature

`functiongetFid(options:GetFidParams):Promise<bigint>;`
## Parameters

#### options

Parameters to pass to the function.

### Type

`letoptions:{address:Address;chain?:Chain;client:ThirdwebClient;disableCache?:boolean;};`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the account's fid, if one exists, otherwise 0.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

