# getSocialProfiles

*Source: [https://portal.thirdweb.com/references/typescript/v5/getSocialProfiles](https://portal.thirdweb.com/references/typescript/v5/getSocialProfiles)*

* References
* getSocialProfiles

Fetches the wallet's available social profiles.

## Example

`import{ getSocialProfiles }from"thirdweb/social";constprofiles=awaitgetSocialProfiles({address:"0x...",client,});`
#### Signature

`functiongetSocialProfiles(args:{address:string;client:ThirdwebClient;}):Promise<Array<SocialProfile>>;`
## Parameters

#### args

The arguments to use when fetching the social profiles.

### Type

`letargs:{address:string;client:ThirdwebClient};`
## Returns

#### Return Type

`letreturnType:{avatar?:string;bio?:string;metadata?:FarcasterProfile|LensProfile|EnsProfile;name?:string;type:"farcaster"|"lens"|"ens";};`A promise resolving to the array of social profiles for the given address.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

