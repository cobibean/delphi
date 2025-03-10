# getPublication

*Source: [https://portal.thirdweb.com/references/typescript/v5/lens/getPublication](https://portal.thirdweb.com/references/typescript/v5/lens/getPublication)*

* References
* getPublication

Calls the "getPublication" function on the contract.

## Example

`import{ getPublication }from"thirdweb/extensions/lens";constresult=awaitgetPublication({contract,profileId:...,pubId:...,});`
#### Signature

`functiongetPublication(options:BaseTransactionOptions<GetPublicationParams>,):Promise<{__DEPRECATED__collectModule:string;__DEPRECATED__collectNFT:string;contentURI:string;pointedProfileId:bigint;pointedPubId:bigint;pubType:number;referenceModule:string;rootProfileId:bigint;rootPubId:bigint;}>;`
## Parameters

#### options

The options for the getPublication function.

### Type

`letoptions:BaseTransactionOptions<GetPublicationParams>;`
## Returns

#### Return Type

`letreturnType:Promise<{__DEPRECATED__collectModule:string;__DEPRECATED__collectNFT:string;contentURI:string;pointedProfileId:bigint;pointedPubId:bigint;pubType:number;referenceModule:string;rootProfileId:bigint;rootPubId:bigint;}>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

