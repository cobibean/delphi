# unlinkProfile

*Source: [https://portal.thirdweb.com/references/typescript/v5/unlinkProfile](https://portal.thirdweb.com/references/typescript/v5/unlinkProfile)*

* References
* unlinkProfile

Disconnects an existing profile (authentication method) from the current user. Once disconnected, that profile can no longer be used to sign into the account.

## Example

`import{ inAppWallet }from"thirdweb/wallets";constwallet=inAppWallet();wallet.connect({ strategy:"google"});constprofiles=awaitgetProfiles({client,});constupdatedProfiles=awaitunlinkProfile({client,profileToUnlink: profiles[0],});`
#### Signature

`functionunlinkProfile(args:UnlinkParams):Promise<Array<Profile>>;`
## Parameters

#### args

The object containing the profile that we want to unlink.

### Type

`letargs:UnlinkParams;`
## Returns

#### Return Type

`letreturnType:{details:{address?:Address;email?:string;id?:string;phone?:string;};type:AuthOption;};`A promise that resolves to the updated linked profiles.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

