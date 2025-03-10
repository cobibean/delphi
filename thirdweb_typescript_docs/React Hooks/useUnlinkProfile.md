# useUnlinkProfile

*Source: [https://portal.thirdweb.com/references/typescript/v5/useUnlinkProfile](https://portal.thirdweb.com/references/typescript/v5/useUnlinkProfile)*

* References
* useUnlinkProfile

Unlinks a web2 or web3 profile currently connected in-app or ecosystem account.When a profile is unlinked from the account, it will no longer be able to be used to sign into the account.

## Example

### Unlinking an email account

`import{ useUnlinkProfile }from"thirdweb/react";const{data:connectedProfiles,isLoading}=useProfiles({client: props.client,});const{mutate:unlinkProfile}=useUnlinkProfile();constonClick=()=>{unlinkProfile({client,// Select any other profile you want to unlinkprofileToUnlink: connectedProfiles[1],});};`
#### Signature

`functionuseUnlinkProfile():UseMutationResult<void,Error,{client:ThirdwebClient;profileToUnlink:Profile},unknown>;`
## Returns

#### Return Type

`letreturnType:UseMutationResult<void,Error,{client:ThirdwebClient;profileToUnlink:Profile},unknown>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

