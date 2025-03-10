# getUserPhoneNumber

*Source: [https://portal.thirdweb.com/references/typescript/v5/getUserPhoneNumber](https://portal.thirdweb.com/references/typescript/v5/getUserPhoneNumber)*

* References
* getUserPhoneNumber

Retrieves the authenticated user phone number for the active embedded wallet.

## Example

`import{ getUserPhoneNumber }from"thirdweb/wallets/embedded";constphoneNumber=awaitgetUserPhoneNumber({ client });console.log(phoneNumber);`
#### Signature

`functiongetUserPhoneNumber(options:GetAuthenticatedUserParams,):Promise<undefined|string>;`
## Parameters

#### options

The arguments for retrieving the authenticated user.

### Type

`letoptions:{client:ThirdwebClient;ecosystem?:Ecosystem};`
## Returns

#### Return Type

`letreturnType:Promise<undefined|string>;`The authenticated user phone number if authenticated with phone number, otherwise undefined.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

