# getFullProfile

*Source: [https://portal.thirdweb.com/references/typescript/v5/lens/getFullProfile](https://portal.thirdweb.com/references/typescript/v5/lens/getFullProfile)*

* References
* getFullProfile

Return the profile datawith Lens handleand optional join date

In Lens Protocol, each profile is associated with an ERC721 token,
thus, the tokenId represent profileId and the 2 terms can be used interchangeably

## Example

`import{ getFullProfile }from"thirdweb/extension/lens";constprofileId=10000n;// profileId is the tokenId of the NFTconstlensProfile=awaitgetFullProfile({ profileId, client });`
#### Signature

`functiongetFullProfile(options:GetFullProfileParams,):Promise<FullProfileResponse>;`
## Parameters

#### options

### Type

`letoptions:{client:ThirdwebClient;includeJoinDate?:boolean;overrides?:{chain?:Chain;lensHandleAddress?:string;lensHubAddress?:string;tokenHandleRegistryAddress?:string;};profileId:bigint;};`
## Returns

#### Return Type

`letreturnType:{handle:string;joinDate:bigint|null;profileData:LensProfileSchema|null;}|null;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

