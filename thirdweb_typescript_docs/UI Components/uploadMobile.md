# uploadMobile

*Source: [https://portal.thirdweb.com/references/typescript/v5/uploadMobile](https://portal.thirdweb.com/references/typescript/v5/uploadMobile)*

* References
* uploadMobile

Batch upload arbitrary file or JSON data using the configured decentralized storage system.
Automatically uploads any file data within JSON objects and replaces them with hashes.

## Example

`// Upload an imagelaunchImageLibrary({ mediaType:"photo"},async(response)=>{if(response.assets?.[0]) {const{fileName,type,uri}=response.assets[0];if(!uri) {thrownewError("No uri");}constresp=awaituploadMobile({uri,type,name: fileName,});}});// Upload an array of JSON objectsconstobjects=[{ name:"JSON 1", text:"Hello World"},{ name:"JSON 2", trait:"Awesome"},];constjsonUris=awaituploadMobile(objects);`
#### Signature

`functionuploadMobile(options:UploadMobileOptions,):Promise<Array<string>>;`
## Parameters

#### options

Options to pass through to the storage uploader class

### Type

`letoptions:InternalUploadMobileOptions&{client:ThirdwebClient};`
## Returns

#### Return Type

`letreturnType:Promise<Array<string>>;`The URIs of the uploaded data

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

