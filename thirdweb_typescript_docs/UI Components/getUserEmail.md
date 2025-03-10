# getUserEmail

*Source: [https://portal.thirdweb.com/references/typescript/v5/getUserEmail](https://portal.thirdweb.com/references/typescript/v5/getUserEmail)*

* References
* getUserEmail

Retrieves the authenticated user email for the active in-app wallet.

## Example

`import{ getUserEmail }from"thirdweb/wallets/in-app";constemail=awaitgetUserEmail({ client });console.log(email);`
#### Signature

`functiongetUserEmail(options:GetAuthenticatedUserParams,):Promise<undefined|string>;`
## Parameters

#### options

The arguments for retrieving the authenticated user.

### Type

`letoptions:{client:ThirdwebClient;ecosystem?:Ecosystem};`
## Returns

#### Return Type

`letreturnType:Promise<undefined|string>;`The authenticated user email if logged in and wallet initialized, otherwise undefined.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

