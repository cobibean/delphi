# preAuthenticate

*Source: [https://portal.thirdweb.com/references/typescript/v5/preAuthenticate](https://portal.thirdweb.com/references/typescript/v5/preAuthenticate)*

* References
* preAuthenticate

Pre-authenticates the user based on the provided authentication strategy.
Use this function to send a verification code to the user's email or phone number.

## Example

`import{ preAuthenticate }from"thirdweb/wallets/in-app";constresult=awaitpreAuthenticate({client,strategy:"email",email:"[email protected]",});`
#### Signature

`functionpreAuthenticate(args:PreAuthArgsType):Promise<void>;`
## Parameters

#### args

The arguments required for pre-authentication.

### Type

`letargs:PreAuthArgsType;`
## Returns

#### Return Type

`letreturnType:Promise<void>;`A promise that resolves to the pre-authentication result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

