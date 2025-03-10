# Contract

*Source: [https://portal.thirdweb.com/typescript/v5/contract](https://portal.thirdweb.com/typescript/v5/contract)*

A "contract" is a wrapper around a smart contract that is deployed on a chain. It is what you use to create transactions and read contract state.

```typescript
import { getContract } from "thirdweb";import { ethereum } from "thirdweb/chains"; // get a contractconst contract = getContract({  // the client you have created via `createThirdwebClient()`  client,  // the chain the contract is deployed on  chain: ethereum,  // the contract's address  address: "0x123...",  // OPTIONAL: the contract's abi  abi: [...],});
```

`import{ getContract }from"thirdweb";import{ ethereum }from"thirdweb/chains";// get a contractconstcontract=getContract({// the client you have created via `createThirdwebClient()`client,// the chain the contract is deployed onchain: ethereum,// the contract's addressaddress:"0x123...",// OPTIONAL: the contract's abiabi: [...],});`Contracts defined this way are lightweight and can be exported as consts accross your application to read or write to it.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

