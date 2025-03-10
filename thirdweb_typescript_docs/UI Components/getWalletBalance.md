# getWalletBalance

*Source: [https://portal.thirdweb.com/references/typescript/v5/getWalletBalance](https://portal.thirdweb.com/references/typescript/v5/getWalletBalance)*

* References
* getWalletBalance

Retrieves the balance of a token or native currency for a given wallet.

## Example

`import{ getWalletBalance }from"thirdweb/wallets";constbalance=awaitgetWalletBalance({address,client,chain,tokenAddress,});`
#### Signature

`functiongetWalletBalance(options:GetWalletBalanceOptions,):Promise<GetWalletBalanceResult>;`
## Parameters

#### options

The options for retrieving the token balance.

### Type

`letoptions:{address:string;chain:Chain;client:ThirdwebClient;tokenAddress?:string;};`
## Returns

#### Return Type

`letreturnType:Promise<GetWalletBalanceResult>;`A promise that resolves to the token balance result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

