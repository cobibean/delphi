# Client

*Source: [https://portal.thirdweb.com/typescript/v5/client](https://portal.thirdweb.com/typescript/v5/client)*

A client is the entry point to the thirdweb SDK. It is required for all other actions.

### Client ID

You must provide aclientIdorsecretKeyin order to initialize a client.

`clientId``secretKey`You can create a client ID for free atthirdweb.com/create-api-key.

## Create a client

#### For "client-side" usage

```typescript
import { createThirdwebClient } from "thirdweb"; const client = createThirdwebClient({  clientId: "<your_client_id>",});
```

`import{ createThirdwebClient }from"thirdweb";constclient=createThirdwebClient({clientId:"<your_client_id>",});`
#### For "server-side" usage

```typescript
import { createThirdwebClient } from "thirdweb"; const client = createThirdwebClient({  secretKey: "<your_secret_key>",});
```

`import{ createThirdwebClient }from"thirdweb";constclient=createThirdwebClient({secretKey:"<your_secret_key>",});`You will need to pass this client to other methods in the SDK. This will allow you to

* get performant RPC to all chains
* download/upload to IPFS
* access Account Abstraction infrastructure (bundler, paymaster)
* access other thirdweb services

### Getting your RPC URL

If you need to access the raw RPC URL, just use thirdweb's default RPC format with your client IDhttps://<chainId>.rpc.thirdweb.com/<clientId>.

`https://<chainId>.rpc.thirdweb.com/<clientId>`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

