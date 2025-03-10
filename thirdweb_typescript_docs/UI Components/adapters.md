# Adapters

*Source: [https://portal.thirdweb.com/typescript/v5/adapters](https://portal.thirdweb.com/typescript/v5/adapters)*

The thirdweb SDK can work side by side with:

* any wallet that supports EIP1193
* ethers.js v5
* ethers.js v6
* viem
* older versions of the @thirdweb-dev/sdk (using the ethers.js v5 adapter)

Adapters allow you to use contracts, providers and wallets from these libraries with the thirdweb SDK and vice versa.

## EIP1193

You can use any wallet that supports EIP1193 with the thirdweb SDK by converting it usingEIP1193.fromProvider:

`EIP1193.fromProvider````typescript
import { EIP1193 } from "thirdweb/wallets"; // Create a Thirdweb wallet from a EIP1193 providerconst wallet = EIP1193.fromProvider({  provider: yourProvider, // any EIP1193 provider}); // Use like any other Thirdweb walletconst account = await wallet.connect({  client: createThirdwebClient({ clientId: "..." }),}); // Sign messagesawait account.signMessage({ message: "Hello World" });
```

`import{ EIP1193 }from"thirdweb/wallets";// Create a Thirdweb wallet from a EIP1193 providerconstwallet=EIP1193.fromProvider({provider: yourProvider,// any EIP1193 provider});// Use like any other Thirdweb walletconstaccount=awaitwallet.connect({client:createThirdwebClient({ clientId:"..."}),});// Sign messagesawaitaccount.signMessage({ message:"Hello World"});`You can also convert a thirdweb account to an EIP1193 provider usingEIP1193.toProvider, which can then be used with other libraries:

`EIP1193.toProvider````typescript
import { EIP1193 } from "thirdweb/wallets"; // Create an EIP-1193 provider from a Thirdweb walletconst provider = EIP1193.toProvider({  wallet,  chain: ethereum,  client: createThirdwebClient({ clientId: "..." }),}); // Use with any EIP-1193 compatible libraryconst accounts = await provider.request({  method: "eth_requestAccounts",});
```

`import{ EIP1193 }from"thirdweb/wallets";// Create an EIP-1193 provider from a Thirdweb walletconstprovider=EIP1193.toProvider({wallet,chain: ethereum,client:createThirdwebClient({ clientId:"..."}),});// Use with any EIP-1193 compatible libraryconstaccounts=awaitprovider.request({method:"eth_requestAccounts",});`
## viem

You can use an existing wallet client from viem with the thirdweb SDK by converting it using theviemAdapter:

`viemAdapter````typescript
import { viemAdapter } from "thirdweb/adapters/viem"; // convert a viem wallet client to a thirdweb walletconst walletClient = createWalletClient(...);const thirdwebWallet = await viemAdapter.wallet.fromViem({  walletClient,});  // convert a thirdweb account to viem wallet clientconst viemClientWallet = viemAdapter.wallet.toViem({  client,  chain,  wallet,});
```

`import{ viemAdapter }from"thirdweb/adapters/viem";// convert a viem wallet client to a thirdweb walletconstwalletClient=createWalletClient(...);constthirdwebWallet=awaitviemAdapter.wallet.fromViem({walletClient,});// convert a thirdweb account to viem wallet clientconstviemClientWallet=viemAdapter.wallet.toViem({client,chain,wallet,});`You can also convert viem public clients and contracts from and to the thirdweb SDK.

View theviemAdapterreference for more details.

## Ethers v6

You can use an existing ethers.js v6 Signer with the thirdweb SDK by converting it using theethers6Adapter:

`ethers6Adapter````typescript
import { ethers6Adapter } from "thirdweb/adapters/ethers6";import { sendTransaction } from "thirdweb"; // convert a ethers signerconst signer: ethers.Signer = ...;const account = await ethers6Adapter.signer.fromEthers({  signer,}); // use it with the thirdweb SDKawait sendTransaction({  transaction,  account,});
```

`import{ ethers6Adapter }from"thirdweb/adapters/ethers6";import{ sendTransaction }from"thirdweb";// convert a ethers signerconstsigner:ethers.Signer=...;constaccount=awaitethers6Adapter.signer.fromEthers({signer,});// use it with the thirdweb SDKawaitsendTransaction({transaction,account,});`Similarly, you can use any wallets created with the thirdweb SDK with ethers.js v6 by converting them using theethers6Adapter:

`ethers6Adapter````typescript
import { ethers6Adapter } from "thirdweb/adapters/ethers6";import { createThirdwebClient, inAppWallet } from "thirdweb/wallets";import { sepolia } from "thirdweb/chains"; const client = createThirdwebClient({ clientId });const wallet = inAppWallet();const chain = sepolia;const account = await wallet.connect({  client,  strategy: "google",}); // convert a thirdweb account to ethers signerconst ethersSigner = await ethers6Adapter.signer.toEthers({  client,  chain,  account,});
```

`import{ ethers6Adapter }from"thirdweb/adapters/ethers6";import{ createThirdwebClient, inAppWallet }from"thirdweb/wallets";import{ sepolia }from"thirdweb/chains";constclient=createThirdwebClient({ clientId });constwallet=inAppWallet();constchain=sepolia;constaccount=awaitwallet.connect({client,strategy:"google",});// convert a thirdweb account to ethers signerconstethersSigner=awaitethers6Adapter.signer.toEthers({client,chain,account,});`You can also convert ethers.js providers and contracts from and to the thirdweb SDK.

View theethers6Adapterreference for more details.

## Ethers v5

You can use an existing ethers.js v5 Signer with the thirdweb SDK by converting it using theethers5Adapter:

`ethers5Adapter````typescript
import { ethers5Adapter } from "thirdweb/adapters/ethers5"; // convert an ethers signer to a thirdweb accountconst signer: ethers.Signer = ...;const account = await ethers5Adapter.signer.fromEthers({  signer,}); // convert a thirdweb account to ethers signerconst ethersSigner = await ethers5Adapter.signer.toEthers({  client,  chain,  account});
```

`import{ ethers5Adapter }from"thirdweb/adapters/ethers5";// convert an ethers signer to a thirdweb accountconstsigner:ethers.Signer=...;constaccount=awaitethers5Adapter.signer.fromEthers({signer,});// convert a thirdweb account to ethers signerconstethersSigner=awaitethers5Adapter.signer.toEthers({client,chain,account});`You can also convert ethers.js providers and contracts from and to the thirdweb SDK.

View theethers5Adapterreference for more details.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

