# getProfile

*Source: [https://portal.thirdweb.com/references/typescript/v5/lens/getProfile](https://portal.thirdweb.com/references/typescript/v5/lens/getProfile)*

* References
* getProfile

Calls the "getProfile" function on the contract.

## Example

`import{ getProfile }from"thirdweb/extensions/lens";constresult=awaitgetProfile({contract,profileId:...,});`
#### Signature

`functiongetProfile(options:BaseTransactionOptions<GetProfileParams>,):Promise<{__DEPRECATED__followNFTURI:string;__DEPRECATED__handle:string;__DEPRECATED__imageURI:string;followModule:string;followNFT:string;metadataURI:string;pubCount:bigint;}>;`
## Parameters

#### options

The options for the getProfile function.

### Type

`letoptions:BaseTransactionOptions<GetProfileParams>;`
## Returns

#### Return Type

`letreturnType:Promise<{__DEPRECATED__followNFTURI:string;__DEPRECATED__handle:string;__DEPRECATED__imageURI:string;followModule:string;followNFT:string;metadataURI:string;pubCount:bigint;}>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

