# createThirdwebClient

*Source: [https://portal.thirdweb.com/references/typescript/v5/createThirdwebClient](https://portal.thirdweb.com/references/typescript/v5/createThirdwebClient)*

* References
* createThirdwebClient

Creates a Thirdweb client using the provided client ID (client-side) or secret key (server-side).

Get your client ID and secret key from the Thirdweb dashboardhere.
**Never share your secret key with anyone.

A client is necessary for most functions in the thirdweb SDK. It provides access to thirdweb APIs including built-in RPC, storage, and more.

## Example

Create a client on the client side (client ID):

`import{ createThirdwebClient }from"thirdweb";constclient=createThirdwebClient({ clientId:"..."});`Create a client on the server (secret key):

`import{ createThirdwebClient }from"thirdweb";constclient=createThirdwebClient({ secretKey:"..."});`
#### Signature

`functioncreateThirdwebClient(options:CreateThirdwebClientOptions,):ThirdwebClient;`
## Parameters

#### options

The options for creating the client.

### Type

`letoptions:Prettify<(|{clientId:string;secretKey?:string}|{clientId?:string;secretKey:string})&ClientOptions>;`
## Returns

#### Return Type

`letreturnType:{readonlyclientId:string;readonlysecretKey:string|undefined;}&Readonly<ClientOptions>;`The created Thirdweb client.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

