# getProfileMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/lens/getProfileMetadata](https://portal.thirdweb.com/references/typescript/v5/lens/getProfileMetadata)*

* References
* getProfileMetadata

Download user lens profile from Arweave
This method does NOT give you the user handle & join-time - consider usinggetFullProfileDatainstead
It is useful & cost efficient if you only want to get user's name, bio, picture, coverPicture etc.

`getFullProfileData`
## Example

`import{ getProfileMetadata }from"thirdweb/extensions/lens";constprofileData=awaitgetProfileMetadata({ profileId, client });if(profileData) {console.log("Display name: ", profileData.lens.name);console.log("Bio: ", profileData.lens.bio);}`
#### Signature

`functiongetProfileMetadata(options:GetProfileMetadataParams,):Promise<null|LensProfileSchema>;`
## Parameters

#### options

### Type

`letoptions:{client:ThirdwebClient;overrides?:{chain?:Chain;lensHubAddress?:string};profileId:bigint;};`
## Returns

#### Return Type

`letreturnType:{lens:{appId?:string;attributes:Array<MetadataAttribute>;bio:string;coverPicture:string;id:string;name:string;picture:string;};signature:string;};`LensProfileSchema | null

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

