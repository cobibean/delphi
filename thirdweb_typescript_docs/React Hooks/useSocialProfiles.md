# useSocialProfiles

*Source: [https://portal.thirdweb.com/references/typescript/v5/useSocialProfiles](https://portal.thirdweb.com/references/typescript/v5/useSocialProfiles)*

* References
* useSocialProfiles

Fetches the wallet's available social profiles.

## Example

`import{ useSocialProfiles }from"thirdweb/react";const{data:profiles}=useSocialProfiles({client,address:"0x...",});`
#### Signature

`functionuseSocialProfiles(options:{address:undefined|string;client:ThirdwebClient;}):UseQueryResult<Array<SocialProfile>,Error>;`
## Parameters

#### options

The options to use when fetching the social profiles.

### Type

`letoptions:{address:undefined|string;client:ThirdwebClient};`
## Returns

#### Return Type

`letreturnType:UseQueryResult<Array<SocialProfile>,Error>;`A React Query result containing the social profiles.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

