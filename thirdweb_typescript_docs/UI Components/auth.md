# Auth

*Source: [https://portal.thirdweb.com/typescript/v5/auth](https://portal.thirdweb.com/typescript/v5/auth)*

UsingEIP-4361(Sign in with Ethererum) standard, you can authenticate users to your backend using only their wallet. This is a secure and easy way to authenticate users without requiring them to create an additional account.

`EIP-4361`
## Usage

### Client Functions

### Auth with React

If you're using React, Auth integrates directly with our built-inConnectButton component. This
handles things like caching, error handling, and retries for you.

```typescript
import { signLoginPayload } from 'thirdweb/auth'; // 1. fetch a login payload from your serverconst result = await fetch(...);const loginPayload = await result.json(); // 2. sign the login payload with the user's accountconst signature = await signLoginPayload({ payload: loginPayload, account }); // 3. send the login payload and signature to your serverconst result = await fetch(...);const verifiedPayload = await result.json();
```

`import{ signLoginPayload }from'thirdweb/auth';// 1. fetch a login payload from your serverconstresult=awaitfetch(...);constloginPayload=awaitresult.json();// 2. sign the login payload with the user's accountconstsignature=awaitsignLoginPayload({ payload: loginPayload, account });// 3. send the login payload and signature to your serverconstresult=awaitfetch(...);constverifiedPayload=awaitresult.json();`How you store and maintain a user session is up to you, but our recommended approach is to store a JWT token in a cookie that is verified on the server. The server functions below include utility functions to generate and verify the JWT.

In order to generate and verify the JWT you will also need an EOA private key. This private key's wallet does not need to hold any funds, it is only used for signing.

### Server Functions

```typescript
import { createThirdwebClient } from "thirdweb";import { createAuth } from "thirdweb/auth";import { privateKeyToAccount } from "thirdweb/wallets"; const privateKey = process.env.THIRDWEB_PRIVATE_KEY;const thirdwebClient = createThirdwebClient({	secretKey: process.env.THIRDWEB_SECRET_KEY;}); const auth = createAuth({	domain: "localhost:3000",	client: thirdwebClient,	adminAccount: privateKeyToAccount({client, privateKey})}); // 1. generate a login payload for a client on the server sideconst loginPayload = await auth.generatePayload({ address: "0x123..." }); // 2. send the login payload to the client to sign // 3. verify the login payload and signature that the client sends back laterconst verifiedPayload = await auth.verifyPayload({	payload: loginPayload,	signature: "0x123...",}); // 4. generate a JWT for the clientconst jwt = await auth.generateJWT({ payload: verifiedPayload }); // 5. set the JWT as a cookie or otherwise provide it to the client // 6. authenticate the client based on the JWT on subsequent callsconst { valid, parsedJWT } = await auth.verifyJWT({ jwt });
```

`import{ createThirdwebClient }from"thirdweb";import{ createAuth }from"thirdweb/auth";import{ privateKeyToAccount }from"thirdweb/wallets";constprivateKey=process.env.THIRDWEB_PRIVATE_KEY;constthirdwebClient=createThirdwebClient({secretKey: process.env.THIRDWEB_SECRET_KEY;});constauth=createAuth({domain:"localhost:3000",client: thirdwebClient,adminAccount:privateKeyToAccount({client, privateKey})});// 1. generate a login payload for a client on the server sideconstloginPayload=awaitauth.generatePayload({ address:"0x123..."});// 2. send the login payload to the client to sign// 3. verify the login payload and signature that the client sends back laterconstverifiedPayload=awaitauth.verifyPayload({payload: loginPayload,signature:"0x123...",});// 4. generate a JWT for the clientconstjwt=awaitauth.generateJWT({ payload: verifiedPayload });// 5. set the JWT as a cookie or otherwise provide it to the client// 6. authenticate the client based on the JWT on subsequent callsconst{valid,parsedJWT}=awaitauth.verifyJWT({ jwt });`
## Example Repos

A working example of Auth + Next.js

A working example of a React + Express app using Auth

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

