# Getting Started

*Source: [https://portal.thirdweb.com/typescript/v5/getting-started](https://portal.thirdweb.com/typescript/v5/getting-started)*

In this quickstart guide, we'll create a basic script to generate a wallet using a private key and send a transaction. We’ll assume you already have a TypeScript project created.

* Install the SDKTo get started, install the thirdweb SDK using your preferred package manager.npmyarnpnpmbunnpmithirdweb
* Create a thirdweb clientGet a client id fromhttps://thirdweb.com/create-api-keyby creating a new project and add it to your.env.THIRDWEB_SECRET_KEY=[YOURSECRETKEY]WALLET_PRIVATE_KEY=[YOURWALLETPRIVATEKEY]Create a thirdweb client in your script.import{ createThirdwebClient }from"thirdweb";constclient=createThirdwebClient({// use `secretKey` for server side or script usagesecretKey: process.env.THIRDWEB_SECRET_KEY,});Client Id vs Secret KeyClient Id is used forclient side usageand is restricted by the domain restrictions you set on your API key, it is a public identifier which can be used on the frontend safely.Secret key is used forserver side or script usageand is not restricted by the domain restrictions. Never expose your secret key in client side code.
* Read Contract StateA client is all you need to start reading blockchain data.Import the extensions you want to use.Define a contract withgetContractat a given address and chain.Call the extension function to read the data.import{ getContract }from"thirdweb";import{ sepolia }from"thirdweb/chains";// 1. import the extension you want to useimport{ getOwnedNFTs }from"thirdweb/extensions/erc1155";// 2. get the contractconstcontract=getContract({client,address:"0x1234...",chain: sepolia,});// 3. call the extension functionconstownedNFTs=awaitgetOwnedNFTs({contract,address:"0x1234...",});console.log(ownedNFTs);
* Generate a wallet from a private keyTo perform transactions from your script, you'll need an account. You can generate a wallet from a private key using theprivateKeyToAccountfunction.import{ privateKeyToAccount }from"thirdweb/wallets";constaccount=privateKeyToAccount({client,privateKey: process.env.PRIVATE_KEY,});// Get the address of the accountconstaddress=account.address;console.log("Connected as", address);
* Read Wallet DataLet's read balance of the account you just created, you'll need funds to perform transactions.import{ getWalletBalance }from"thirdweb/wallets";// Get the balance of the accountconstbalance=awaitgetWalletBalance({account,chain: sepolia,});console.log("Balance:", balance.displayValue, balance.symbol);
* Send a transactionWith the account created and funded, you can now send a transaction.Import the extension you want to use.Define a contract withgetContractat a given address and chain.Call the extension function to prepare the transaction.Send the transaction.import{ getContract, sendTransaction }from"thirdweb";// 1. Import the extension you want to useimport{ transfer }from"thirdweb/extensions/erc20";// 2. Define the contractconstcontract=getContract({client,address:"0x1234...",chain: sepolia,});// 3. Call the extension function to prepare the transactionconsttransaction=transfer({contract,to:"0x1234...",amount:"0.01",});// 4. Send the transactionconstresult=awaitsendTransaction({transaction,account,});console.log("Transaction hash:", result.transactionHash);You can also call generic contract functions using theprepareContractCallfunction by just specifying the solidity method signature you want to call. The arguments will be automatically inferred based on the method signature.import{getContract,prepareContractCall,sendTransaction,}from"thirdweb";import{ sepolia }from"thirdweb/chains";import{ toWei }from"thirdweb/utils";// 1. Define the contractconstcontract=getContract({client,address:"0x1234...",chain: sepolia,});// 2. Prepare the transactionconsttransaction=prepareContractCall({contract,// Pass the method signature that you want to callmethod:"function mintTo(address to, uint256 amount)",// and the params for that method// Their types are automatically inferred based on the method signatureparams: ["0x123...",toWei("100")],});// 3. Send the transactionconstresult=awaitsendTransaction({transaction,account,});console.log("Transaction hash:", result.transactionHash);
* ConclusionYou've now learned the basics of how to use the thirdweb SDK to read and write to the blockchain. You can now start building your own applications and explore the full potential of the SDK.View the full SDK reference.

### Install the SDK

To get started, install the thirdweb SDK using your preferred package manager.

`npmithirdweb`
### Create a thirdweb client

Get a client id fromhttps://thirdweb.com/create-api-keyby creating a new project and add it to your.env.

`.env````typescript
THIRDWEB_SECRET_KEY=[YOUR SECRET KEY]WALLET_PRIVATE_KEY=[YOUR WALLET PRIVATE KEY]
```

`THIRDWEB_SECRET_KEY=[YOURSECRETKEY]WALLET_PRIVATE_KEY=[YOURWALLETPRIVATEKEY]`Create a thirdweb client in your script.

```typescript
import { createThirdwebClient } from "thirdweb"; const client = createThirdwebClient({  // use `secretKey` for server side or script usage  secretKey: process.env.THIRDWEB_SECRET_KEY,});
```

`import{ createThirdwebClient }from"thirdweb";constclient=createThirdwebClient({// use `secretKey` for server side or script usagesecretKey: process.env.THIRDWEB_SECRET_KEY,});`
### Client Id vs Secret Key

Client Id is used forclient side usageand is restricted by the domain restrictions you set on your API key, it is a public identifier which can be used on the frontend safely.

Secret key is used forserver side or script usageand is not restricted by the domain restrictions. Never expose your secret key in client side code.

### Read Contract State

A client is all you need to start reading blockchain data.

* Import the extensions you want to use.
* Define a contract withgetContractat a given address and chain.
* Call the extension function to read the data.

`getContract````typescript
import { getContract } from "thirdweb";import { sepolia } from "thirdweb/chains";// 1. import the extension you want to useimport { getOwnedNFTs } from "thirdweb/extensions/erc1155"; // 2. get the contractconst contract = getContract({  client,  address: "0x1234...",  chain: sepolia,}); // 3. call the extension functionconst ownedNFTs = await getOwnedNFTs({  contract,  address: "0x1234...",}); console.log(ownedNFTs);
```

`import{ getContract }from"thirdweb";import{ sepolia }from"thirdweb/chains";// 1. import the extension you want to useimport{ getOwnedNFTs }from"thirdweb/extensions/erc1155";// 2. get the contractconstcontract=getContract({client,address:"0x1234...",chain: sepolia,});// 3. call the extension functionconstownedNFTs=awaitgetOwnedNFTs({contract,address:"0x1234...",});console.log(ownedNFTs);`
### Generate a wallet from a private key

To perform transactions from your script, you'll need an account. You can generate a wallet from a private key using theprivateKeyToAccountfunction.

`privateKeyToAccount````typescript
import { privateKeyToAccount } from "thirdweb/wallets"; const account = privateKeyToAccount({  client,  privateKey: process.env.PRIVATE_KEY,}); // Get the address of the accountconst address = account.address;console.log("Connected as", address);
```

`import{ privateKeyToAccount }from"thirdweb/wallets";constaccount=privateKeyToAccount({client,privateKey: process.env.PRIVATE_KEY,});// Get the address of the accountconstaddress=account.address;console.log("Connected as", address);`
### Read Wallet Data

Let's read balance of the account you just created, you'll need funds to perform transactions.

```typescript
import { getWalletBalance } from "thirdweb/wallets"; // Get the balance of the accountconst balance = await getWalletBalance({  account,  chain: sepolia,});console.log("Balance:", balance.displayValue, balance.symbol);
```

`import{ getWalletBalance }from"thirdweb/wallets";// Get the balance of the accountconstbalance=awaitgetWalletBalance({account,chain: sepolia,});console.log("Balance:", balance.displayValue, balance.symbol);`
### Send a transaction

With the account created and funded, you can now send a transaction.

* Import the extension you want to use.
* Define a contract withgetContractat a given address and chain.
* Call the extension function to prepare the transaction.
* Send the transaction.

`getContract````typescript
import { getContract, sendTransaction } from "thirdweb";// 1. Import the extension you want to useimport { transfer } from "thirdweb/extensions/erc20"; // 2. Define the contractconst contract = getContract({  client,  address: "0x1234...",  chain: sepolia,}); // 3. Call the extension function to prepare the transactionconst transaction = transfer({  contract,  to: "0x1234...",  amount: "0.01",}); // 4. Send the transactionconst result = await sendTransaction({  transaction,  account,}); console.log("Transaction hash:", result.transactionHash);
```

`import{ getContract, sendTransaction }from"thirdweb";// 1. Import the extension you want to useimport{ transfer }from"thirdweb/extensions/erc20";// 2. Define the contractconstcontract=getContract({client,address:"0x1234...",chain: sepolia,});// 3. Call the extension function to prepare the transactionconsttransaction=transfer({contract,to:"0x1234...",amount:"0.01",});// 4. Send the transactionconstresult=awaitsendTransaction({transaction,account,});console.log("Transaction hash:", result.transactionHash);`You can also call generic contract functions using theprepareContractCallfunction by just specifying the solidity method signature you want to call. The arguments will be automatically inferred based on the method signature.

`prepareContractCall````typescript
import {  getContract,  prepareContractCall,  sendTransaction,} from "thirdweb";import { sepolia } from "thirdweb/chains";import { toWei } from "thirdweb/utils"; // 1. Define the contractconst contract = getContract({  client,  address: "0x1234...",  chain: sepolia,}); // 2. Prepare the transactionconst transaction = prepareContractCall({  contract,  // Pass the method signature that you want to call  method: "function mintTo(address to, uint256 amount)",  // and the params for that method  // Their types are automatically inferred based on the method signature  params: ["0x123...", toWei("100")],}); // 3. Send the transactionconst result = await sendTransaction({  transaction,  account,}); console.log("Transaction hash:", result.transactionHash);
```

`import{getContract,prepareContractCall,sendTransaction,}from"thirdweb";import{ sepolia }from"thirdweb/chains";import{ toWei }from"thirdweb/utils";// 1. Define the contractconstcontract=getContract({client,address:"0x1234...",chain: sepolia,});// 2. Prepare the transactionconsttransaction=prepareContractCall({contract,// Pass the method signature that you want to callmethod:"function mintTo(address to, uint256 amount)",// and the params for that method// Their types are automatically inferred based on the method signatureparams: ["0x123...",toWei("100")],});// 3. Send the transactionconstresult=awaitsendTransaction({transaction,account,});console.log("Transaction hash:", result.transactionHash);`
### Conclusion

You've now learned the basics of how to use the thirdweb SDK to read and write to the blockchain. You can now start building your own applications and explore the full potential of the SDK.

View the full SDK reference.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

