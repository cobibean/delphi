# resolveScheme

*Source: [https://portal.thirdweb.com/references/typescript/v5/resolveScheme](https://portal.thirdweb.com/references/typescript/v5/resolveScheme)*

* References
* resolveScheme

Resolves the scheme of a given URI and returns the corresponding URL.
If the URI starts with "ipfs://", it constructs a URL using the IPFS client ID and the IPFS gateway.
If the URI starts with "http", it returns the URI as is.
Otherwise, it throws an error indicating an invalid URI scheme.

## Example

`import{ resolveScheme }from"thirdweb/storage";consturl=resolveScheme({client,uri:"ipfs://Qm...",});`
#### Signature

`functionresolveScheme(options:ResolveSchemeOptions):string;`
## Parameters

#### options

The options object containing the URI and the IPFS client.

### Type

`letoptions:{client:ThirdwebClient;uri:string};`
## Returns

#### Return Type

`letreturnType:string;`The resolved URL.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

