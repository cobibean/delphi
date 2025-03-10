# upload

*Source: [https://portal.thirdweb.com/references/typescript/v5/upload](https://portal.thirdweb.com/references/typescript/v5/upload)*

* References
* upload

Uploads files based on the provided options.

## Example

### Uploading JSON objects

`import{ upload }from"thirdweb/storage";consturi=awaitupload({client,files: [{name:"something",data: {hello:"world",},},],});`
### Uploading files

`import{ upload }from"thirdweb/storage";consturi=awaitupload({client,files: [newFile(["hello world"],"hello.txt")],});`
#### Signature

`functionupload(options:UploadOptions<TFiles>,):Promise<UploadReturnType<TFiles>>;`
## Parameters

#### options

The upload options.

### Type

`letoptions:UploadOptions<TFiles>;`
## Returns

#### Return Type

`letreturnType:Promise<UploadReturnType<TFiles>>;`A promise that resolves to the uploaded file URI or URIs (when passing multiple files).

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

