# download

*Source: [https://portal.thirdweb.com/references/typescript/v5/download](https://portal.thirdweb.com/references/typescript/v5/download)*

* References
* download

## Example

Download a file from IPFS:

`import{ download }from"thirdweb/storage";import{ createThirdwebClient }from"thirdweb";constclient=createThirdwebClient({ clientId:"YOUR_CLIENT_ID"});constfile=awaitdownload({client,uri:"ipfs://Qm...",});`Download a file from Arweave:

`import{ download }from"thirdweb/storage";import{ createThirdwebClient }from"thirdweb";constclient=createThirdwebClient({ clientId:"YOUR_CLIENT_ID"});constfile=awaitdownload({client,uri:"ar://{arweave-transaction-id}",});`Download a file from HTTP:

`import{ download }from"thirdweb/storage";import{ createThirdwebClient }from"thirdweb";constclient=createThirdwebClient({ clientId:"YOUR_CLIENT_ID"});constfile=awaitdownload({client,uri:"https://example.com/file.txt",});`
#### Signature

`functiondownload(options:{client:ThirdwebClient;requestTimeoutMs?:number;uri:string;}):Promise<Response>;`
## Parameters

#### options

The download options.

### Type

`letoptions:{client:ThirdwebClient;requestTimeoutMs?:number;uri:string;};`
## Returns

#### Return Type

`letreturnType:Promise<Response>;`Asynchronously returns the network response from fetching the file.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

