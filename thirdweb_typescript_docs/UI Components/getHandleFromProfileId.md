# getHandleFromProfileId

*Source: [https://portal.thirdweb.com/references/typescript/v5/lens/getHandleFromProfileId](https://portal.thirdweb.com/references/typescript/v5/lens/getHandleFromProfileId)*

* References
* getHandleFromProfileId

Return the Lens handle of a profile in the format: lens/@<name-of-user>

`<name-of-user>`
## Example

`import{ getHandleFromProfileId }from"thirdweb/extensions/lens";constprofileId=461662n;consthandle=awaitgetHandleFromProfileId({ profileId, client });// "lens/@captain_jack"`
#### Signature

`functiongetHandleFromProfileId(options:GetHandleFromProfileIdParams,):Promise<null|string>;`
## Parameters

#### options

### Type

`letoptions:{client:ThirdwebClient;overrides?:{chain?:Chain;lensHandleAddress?:string;tokenHandleRegistryAddress?:string;};profileId:bigint;};`
## Returns

#### Return Type

`letreturnType:Promise<null|string>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

