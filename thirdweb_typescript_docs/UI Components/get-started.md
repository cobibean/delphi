# Using Account abstraction in Typescript

*Source: [https://portal.thirdweb.com/typescript/v5/account-abstraction/get-started](https://portal.thirdweb.com/typescript/v5/account-abstraction/get-started)*

By using theTypeScript SDK, you can use smart accounts in your applications easily.

## Example Use Cases

The wallet SDK with the TypeScript SDK is primarily used when creating a backend for your application or when creating a node script.
In this guide, we will be using the wallet SDK to create a Node script but the logic for creating a backend is the same.

If you are working in a React environment, you are recommended to followthis guide.

* Create an API keyTo use the bundler and paymaster, you must create an API key and a billing account.To create an API Key:Head to the settings page in the dashboard and click theAPI Keystab.Click onCreate API Key.Follow the steps to create your API key.To use account abstraction infrastructure on mainnet you will also need tocreate an account and add a payment method.
* Create a Node ScriptTo use smart accounts in a node script, simply create a new Node.js project and install thethirdwebpackage.npmithirdwebCreate a.envfile and add the following:THIRDWEB_SECRET_KEY=<YOUR_SECRET_KEY>PRIVATE_KEY=<A_TEST_WALLET_PRIVATE_KEY>Create anindex.tsfile where we'll write our script.
* Creating the Personal Wallet KeyThis smart account is unlocked by a 'key' - a personal wallet.
This key can be anything from a MetaMask wallet or an In-App Wallet or just a private key and is used as a way to 'sign in' to the smart account.To create a personal wallet key, we are going to use theprivateKeyAccount, which we need to import from thethirdweb/walletspackage.import{ createThirdwebClient }from"thirdweb";import{ privateKeyAccount }from"thirdweb/wallets";constclient=createThirdwebClient({secretKey: process.env.THIRDWEB_SECRET_KEYasstring,});constpersonalAccount=privateKeyAccount({client,privateKey: process.env.PRIVATE_KEYasstring,});console.log("Personal account address:", personalAccount.address);
* Creating the Smart accountNow, let's create a smart account usingsmartWalletfromthirdweb/walletspackage.
To do this, we need to pass an object of typeSmartWalletOptionsto the function.Some of the important properties in this object are:chain: the chain that the smart account will be deployed on.sponsorGas: whether the smart account should have sponsored transactions or not.Once we have created the smart wallet interface, we can connect the personal wallet to the smart account using theconnectmethod.import{ smartWallet }from"thirdweb/wallets";// Configure the smart walletconstwallet=smartWallet({chain: sepolia,sponsorGas:true,});// Connect the smart walletconstsmartAccount=awaitwallet.connect({client,personalAccount,});
* Using the Smart AccountNow that we have created a smart account object and connected it, we can use it to perform onchain actions gaslessly.In this example, we will claim a NFT using theclaimTomethod and then send the transaction using thesendTransactionmethod.constbalance=awaitgetWalletBalance({client,chain,address: smartAccount.address,});console.log("Smart account balance:", balance.displayValue);constcontract=getContract({client,chain: sepolia,address:"0x...",// deploy a drop contract from thirdweb.com/explore});consttransaction=awaitclaimTo({contract,to: smartAccount.address,quantity:1,});const{transactionHash}=awaitsendTransaction({transaction,smartAccount,});console.log(`Minted NFT with transaction hash: ${transactionHash}`);We have also passed oursecretKeyto the SDK so that we can use the bundler and paymaster.We have also added some helpful logs to view the smart account address and balance using the associatedbalanceandgetAddressmethods.
* Run the ScriptTo run the script, run the following command:bunindex.tsAs you can see in the terminal output, upon claiming the token, the smart account is deployed. This is because smart account contracts are deployed when the first transaction is initiated.We have successfully deployed a smart account and claimed an ERC20 token!
* ConclusionIn this guide, we have learned how to use the wallet SDK with the TypeScript SDK to
create a smart account and claim an NFT.

### Create an API key

To use the bundler and paymaster, you must create an API key and a billing account.

To create an API Key:

* Head to the settings page in the dashboard and click theAPI Keystab.
* Click onCreate API Key.
* Follow the steps to create your API key.

To use account abstraction infrastructure on mainnet you will also need tocreate an account and add a payment method.

### Create a Node Script

To use smart accounts in a node script, simply create a new Node.js project and install thethirdwebpackage.

`thirdweb````typescript
npm i thirdweb
```

`npmithirdweb`Create a.envfile and add the following:

`.env````typescript
THIRDWEB_SECRET_KEY=<YOUR_SECRET_KEY>PRIVATE_KEY=<A_TEST_WALLET_PRIVATE_KEY>
```

`THIRDWEB_SECRET_KEY=<YOUR_SECRET_KEY>PRIVATE_KEY=<A_TEST_WALLET_PRIVATE_KEY>`Create anindex.tsfile where we'll write our script.

`index.ts`
### Creating the Personal Wallet Key

This smart account is unlocked by a 'key' - a personal wallet.
This key can be anything from a MetaMask wallet or an In-App Wallet or just a private key and is used as a way to 'sign in' to the smart account.

To create a personal wallet key, we are going to use theprivateKeyAccount, which we need to import from thethirdweb/walletspackage.

`privateKeyAccount``thirdweb/wallets````typescript
import { createThirdwebClient } from "thirdweb";import { privateKeyAccount } from "thirdweb/wallets"; const client = createThirdwebClient({  secretKey: process.env.THIRDWEB_SECRET_KEY as string,}); const personalAccount = privateKeyAccount({  client,  privateKey: process.env.PRIVATE_KEY as string,});console.log("Personal account address:", personalAccount.address);
```

`import{ createThirdwebClient }from"thirdweb";import{ privateKeyAccount }from"thirdweb/wallets";constclient=createThirdwebClient({secretKey: process.env.THIRDWEB_SECRET_KEYasstring,});constpersonalAccount=privateKeyAccount({client,privateKey: process.env.PRIVATE_KEYasstring,});console.log("Personal account address:", personalAccount.address);`
### Creating the Smart account

Now, let's create a smart account usingsmartWalletfromthirdweb/walletspackage.
To do this, we need to pass an object of typeSmartWalletOptionsto the function.

`smartWallet``thirdweb/wallets`Some of the important properties in this object are:

* chain: the chain that the smart account will be deployed on.
* sponsorGas: whether the smart account should have sponsored transactions or not.

`chain``sponsorGas`Once we have created the smart wallet interface, we can connect the personal wallet to the smart account using theconnectmethod.

`connect````typescript
import { smartWallet } from "thirdweb/wallets"; // Configure the smart walletconst wallet = smartWallet({  chain: sepolia,  sponsorGas: true,}); // Connect the smart walletconst smartAccount = await wallet.connect({  client,  personalAccount,});
```

`import{ smartWallet }from"thirdweb/wallets";// Configure the smart walletconstwallet=smartWallet({chain: sepolia,sponsorGas:true,});// Connect the smart walletconstsmartAccount=awaitwallet.connect({client,personalAccount,});`
### Using the Smart Account

Now that we have created a smart account object and connected it, we can use it to perform onchain actions gaslessly.

In this example, we will claim a NFT using theclaimTomethod and then send the transaction using thesendTransactionmethod.

`claimTo``sendTransaction````typescript
const balance = await getWalletBalance({  client,  chain,  address: smartAccount.address,});console.log("Smart account balance:", balance.displayValue); const contract = getContract({  client,  chain: sepolia,  address: "0x...", // deploy a drop contract from thirdweb.com/explore}); const transaction = await claimTo({  contract,  to: smartAccount.address,  quantity: 1,});const { transactionHash } = await sendTransaction({  transaction,  smartAccount,});console.log(`Minted NFT with transaction hash: ${transactionHash}`);
```

`constbalance=awaitgetWalletBalance({client,chain,address: smartAccount.address,});console.log("Smart account balance:", balance.displayValue);constcontract=getContract({client,chain: sepolia,address:"0x...",// deploy a drop contract from thirdweb.com/explore});consttransaction=awaitclaimTo({contract,to: smartAccount.address,quantity:1,});const{transactionHash}=awaitsendTransaction({transaction,smartAccount,});console.log(`Minted NFT with transaction hash: ${transactionHash}`);`We have also passed oursecretKeyto the SDK so that we can use the bundler and paymaster.

`secretKey`We have also added some helpful logs to view the smart account address and balance using the associatedbalanceandgetAddressmethods.

`balance``getAddress`
### Run the Script

To run the script, run the following command:

```typescript
bun index.ts
```

`bunindex.ts`As you can see in the terminal output, upon claiming the token, the smart account is deployed. This is because smart account contracts are deployed when the first transaction is initiated.

We have successfully deployed a smart account and claimed an ERC20 token!

### Conclusion

In this guide, we have learned how to use the wallet SDK with the TypeScript SDK to
create a smart account and claim an NFT.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

