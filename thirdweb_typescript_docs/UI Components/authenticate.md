# authenticate

*Source: [https://portal.thirdweb.com/references/typescript/v5/authenticate](https://portal.thirdweb.com/references/typescript/v5/authenticate)*

* References
* authenticate

Authenticates the user based on the provided authentication arguments.

## Example

`import{ authenticate }from"thirdweb/wallets/in-app";constresult=awaitauthenticate({client,strategy:"email",email:"[email protected]",verificationCode:"123456",});`Authenticate to a backend account (only do this on your backend):

`import{ authenticate }from"thirdweb/wallets/in-app";constresult=awaitauthenticate({client,strategy:"backend",walletSecret:"...",// Provided by your app});`
#### Signature

`functionauthenticate(args:AuthArgsType,):Promise<AuthStoredTokenWithCookieReturnType>;`
## Parameters

#### args

The authentication arguments.

### Type

`letargs:AuthArgsType;`
## Returns

#### Return Type

`letreturnType:Promise<AuthStoredTokenWithCookieReturnType>;`A promise that resolves to the authentication result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

