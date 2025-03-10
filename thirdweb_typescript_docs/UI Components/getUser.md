# getUser

*Source: [https://portal.thirdweb.com/references/typescript/v5/getUser](https://portal.thirdweb.com/references/typescript/v5/getUser)*

* References
* getUser

Gets user based on the provided query parameters.
This function is only available on the server (a secret key is required in the client).

## Example

`import{ getUser }from"thirdweb/wallets";constuser=awaitgetUser({client,walletAddress:"0x123...",});`
#### Signature

`functiongetUser(options:{client:ThirdwebClient;ecosystem?:Ecosystem;email?:string;externalWalletAddress?:string;id?:string;phone?:string;walletAddress?:string;}):Promise<null|GetUserResult>;`
## Parameters

#### options

The options for the get user function.

### Type

`letoptions:{client:ThirdwebClient;ecosystem?:Ecosystem;email?:string;externalWalletAddress?:string;id?:string;phone?:string;walletAddress?:string;};`
## Returns

#### Return Type

`letreturnType:{createdAt:string;email?:string;phone?:string;profiles:Array<Profile>;userId:string;walletAddress:string;};`A user object or null if not found.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

