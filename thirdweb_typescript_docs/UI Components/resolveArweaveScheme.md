# resolveArweaveScheme

*Source: [https://portal.thirdweb.com/references/typescript/v5/resolveArweaveScheme](https://portal.thirdweb.com/references/typescript/v5/resolveArweaveScheme)*

* References
* resolveArweaveScheme

Resolves the scheme of a given Arweave URI and returns the corresponding URL.

## Example

`import{ resolveArweaveScheme }from"thirdweb/storage";consturl=resolveArweaveScheme({ uri:"ar://<fileId>"});`
#### Signature

`functionresolveArweaveScheme(options:ResolveArweaveSchemeOptions,):string;`
## Parameters

#### options

The options object containing the Arweave URI

### Type

`letoptions:{gatewayUrl?:string;uri:string};`
## Returns

#### Return Type

`letreturnType:string;`The resolved URL

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

