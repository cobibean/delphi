# linkProfile

*Source: [https://portal.thirdweb.com/typescript/v5/linkProfile](https://portal.thirdweb.com/typescript/v5/linkProfile)*

Connects a new profile (and new authentication method) to the current user.

Requires a connected in-app or ecosystem account.

When a profile is linked to the account, that profile can then be used to sign into the same account.

## Example

`import{ linkProfile }from"thirdweb/wallets";// optionally specify the ecosystem if you're linking an ecosystem walletawaitlinkProfile({ client, strategy:"discord"});`
#### Signature

`functionlinkProfile(args:AuthArgsType):Promise<Array<Profile>>;`
## Parameters

#### args

### Type

`letargs:AuthArgsType;`
## Returns

#### Return Type

`letreturnType:{details:{address?:Address;email?:string;id?:string;phone?:string;};type:AuthOption;};`A promise that resolves to the currently linked profiles when the connection is successful.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

