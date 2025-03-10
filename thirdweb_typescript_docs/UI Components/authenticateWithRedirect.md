# authenticateWithRedirect

*Source: [https://portal.thirdweb.com/references/typescript/v5/authenticateWithRedirect](https://portal.thirdweb.com/references/typescript/v5/authenticateWithRedirect)*

* References
* authenticateWithRedirect

Authenticates the user based on the provided authentication arguments using a redirect.

## Example

`import{ authenticateWithRedirect }from"thirdweb/wallets/in-app";constresult=awaitauthenticateWithRedirect({client,strategy:"google",mode:"redirect",redirectUrl:"https://example.org",});`
#### Signature

`functionauthenticateWithRedirect(args:SocialAuthArgsType&{client:ThirdwebClient;ecosystem?:Ecosystem;},):Promise<void>;`
## Parameters

#### args

The authentication arguments.

### Type

`letargs:SocialAuthArgsType&{client:ThirdwebClient;ecosystem?:Ecosystem;};`
## Returns

#### Return Type

`letreturnType:Promise<void>;`A promise that resolves to the authentication result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

