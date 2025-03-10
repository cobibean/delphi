# getProfiles

*Source: [https://portal.thirdweb.com/references/typescript/v5/getProfiles](https://portal.thirdweb.com/references/typescript/v5/getProfiles)*

* References
* getProfiles

Gets the linked profiles for the connected in-app or ecosystem wallet.

## Example

`import{ getProfiles }from"thirdweb/wallets";constprofiles=awaitgetProfiles({client,});console.log(profiles[0].type);// will be "email", "phone", "google", "discord", etcconsole.log(profiles[0].details.email);console.log(profiles[0].details.phone);`
### Getting profiles for a ecosystem user

`import{ getProfiles }from"thirdweb/wallets/in-app";constprofiles=awaitgetProfiles({client,ecosystem: {id:"ecosystem.your-ecosystem-id",},});`
#### Signature

`functiongetProfiles(args:GetAuthenticatedUserParams,):Promise<Array<Profile>>;`
## Parameters

#### args

### Type

`letargs:{client:ThirdwebClient;ecosystem?:Ecosystem};`
## Returns

#### Return Type

`letreturnType:{details:{address?:Address;email?:string;id?:string;phone?:string;};type:AuthOption;};`An array of accounts user profiles linked to the connected wallet.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

