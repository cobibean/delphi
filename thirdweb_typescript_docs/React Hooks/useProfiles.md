# useProfiles

*Source: [https://portal.thirdweb.com/references/typescript/v5/useProfiles](https://portal.thirdweb.com/references/typescript/v5/useProfiles)*

* References
* useProfiles

Retrieves all linked profiles of the connected in-app or ecosystem account.

## Example

`import{ useProfiles }from"thirdweb/react";const{data:profiles}=useProfiles({client,});console.log("Type:", profiles[0].type);// "discord"console.log("Email:", profiles[0].details.email);// "[email protected]"`
#### Signature

`functionuseProfiles(args:{client:ThirdwebClient;}):UseQueryResult<Array<Profile>>;`
## Parameters

#### args

### Type

`letargs:{client:ThirdwebClient};`
## Returns

#### Return Type

`letreturnType:UseQueryResult<Array<Profile>>;`A React Query result containing the linked profiles for the connected in-app account.
This hook will only run if the connected wallet supports account linking.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

