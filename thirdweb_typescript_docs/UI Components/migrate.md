# Migration from TypeScript SDK v4

*Source: [https://portal.thirdweb.com/typescript/v5/migrate](https://portal.thirdweb.com/typescript/v5/migrate)*

### Looking to migrate to React SDK v5?

Go to this page for an in-depth React migration guide

## Why you should migrate to SDK v5

#### 1. Better performance, happier clients

The new SDK is built with performance in mind and proper tree-shaking. Therefore, the minimum bundle size of your application is greatly reduced.

Below is the comparison of 2 similar applications, usingConnectWallet(v4) &ConnectButton(v5), which are identical in term of functionality.

`ConnectWallet``ConnectButton`
|  | SDK v4 | SDK v5 |
| ---- | ---- | ---- |
| Minimum bundle size | 766kb | 104kb |
| Dependencies | "@thirdweb-dev/react": "^4.9.4""@thirdweb-dev/sdk": "^4.0.99""ethers": "^5.7.2" | "thirdweb": "^5.42.0" |

`"@thirdweb-dev/react": "^4.9.4"``"@thirdweb-dev/sdk": "^4.0.99"``"ethers": "^5.7.2"``"thirdweb": "^5.42.0"`(Built with Next.js 14.2.5)

#### 2. More wallets supported

The SDK v4 only supports a handful of web3 wallets and the more wallets you want to include in your app, the heavier it becomes.

SDK v5 supports over 300 wallets and this number is increasing! You caninteract with wallets based on their unique IDs.
Hence, adding more wallets to your app has little to no effect to the final bundle.

#### 3. Flexibility with React hooks

When building a React web3 application with thirdweb SDK v4, you have access to a set of prebuilt React hooks which let you conveniently interact with your smart contracts.

The issue with this approach is that, the number of smart-contract methods is ever-increasing, and for each hook that does not exist, we have to dedicate time & energy
to write, test & maintain. This process is time-consuming & frankly, the more React hooks you add to your app, the slower and more unmaintainable your projects become.

In SDK v5, we introduce a novel concept called "prebuilt extensions" - a set of read & write methods for popular contracts which you canplug & play. For example:

###### Read contract states with v5

```typescript
// Get a list of owned ERC721 tokens in a walletimport { useReadContract } from "thirdweb/react";import { getOwnedNFTs } from "thirdweb/extensions/erc721"; const { data } = useReadContract(getOwned, { contract, owner });
```

`// Get a list of owned ERC721 tokens in a walletimport{ useReadContract }from"thirdweb/react";import{ getOwnedNFTs }from"thirdweb/extensions/erc721";const{data}=useReadContract(getOwned, { contract, owner });`
###### Write to contract with v5

```typescript
// Claim an NFT from thirdweb Drop contractimport { useSendTransaction } from "thirdweb/react";import { claimTo } from "thirdweb/extensions/erc721"; const { mutate: sendTx } = useSendTransaction();const transaction = claimTo({  contract,  to: "0x...",  quantity: 1n,});sendTx(transaction);
```

`// Claim an NFT from thirdweb Drop contractimport{ useSendTransaction }from"thirdweb/react";import{ claimTo }from"thirdweb/extensions/erc721";const{mutate:sendTx}=useSendTransaction();consttransaction=claimTo({contract,to:"0x...",quantity:1n,});sendTx(transaction);`As you can see, by pairing the contract extensions withuseReadContract(for read) anduseSendTransaction(for write),
we are able to greatly reduce the amount of code that is packaged & shipped to the end users. Plus, with this approach we can dedicate more time
to building contract extensions. The SDK v5 currenty supports over hundreds of extensions, with some popular protocols like Uniswap, Farcaster, Lens & more to come.

`useReadContract``useSendTransaction`View a list ofsupported extensionshere, orbuild your own!

#### 4. Access to latest software

Currently the SDK v4 is using[email protected]and@tanstack/react-query@^4which can be considered "outdated".
We unfortunately do not have a plan to upgrade v4's dependencies to the latest versions.
We highly recommend you to migrate to the SDK v5 to receive the latest software with better security and performance.Want to keep using ethers.js 5? Worry not! The SDK v5 comes with powerful adapters which let you use thirdweb with popular web3 frameworks like viem or ethers 5 & 6.Learn more

`[email protected]``@tanstack/react-query@^4`
## High-level changes

* All imports from@thirdweb-dev/*should be replaced withthirdwebSDK with sub-exports.
* The new SDK isfunctionbased rather thanclassbased for better tree shaking and performance.
* All contract calls are now prepared usingprepareContractCalland sent using thesendTransactionfunction.
* Transactions are submitted without waiting for receipt by default. You can call thewaitForReceiptfunction to wait for the transaction to be mined.

`@thirdweb-dev/*``thirdweb``function``class``prepareContractCall``sendTransaction``waitForReceipt`
## Progressive migration

If you're currently using the@thirdweb-dev/sdk, you can progressively migrate to the newthirdwebSDK. Both SDKs can be used side by side and are interoperable with each other.

`@thirdweb-dev/sdk``thirdweb`You can easily share the same wallet between the two SDKs by using theethers5adapterutility, allowing you to progressively replace calls one by one.

`ethers5adapter````typescript
import { ThirdwebSDK } from "@thirdweb-dev/sdk";import { prepareContractCall, sendTransaction } from "thirdweb";import { ethers5Adapter } from "thirdweb/adapters/ethers5"; const sdk = ThirdwebSDK.fromPrivateKey(pkey, chain); // convert the signer to be used with the new thirdweb SDKconst account = await ethers5Adapter.signer.fromEthers(sdk.getSigner()); // then use the new thirdweb SDK normallyconst transaction = prepareContractCall({ ... });await sendTransaction({	transaction,	account,});
```

`import{ ThirdwebSDK }from"@thirdweb-dev/sdk";import{ prepareContractCall, sendTransaction }from"thirdweb";import{ ethers5Adapter }from"thirdweb/adapters/ethers5";constsdk=ThirdwebSDK.fromPrivateKey(pkey, chain);// convert the signer to be used with the new thirdweb SDKconstaccount=awaitethers5Adapter.signer.fromEthers(sdk.getSigner());// then use the new thirdweb SDK normallyconsttransaction=prepareContractCall({...});awaitsendTransaction({transaction,account,});`In React, you can mix and match the v4 and v5ThirdwebProvider, that gives you access to the hooks and functionality of both SDKs.

`ThirdwebProvider````typescript
import { ThirdwebProvider} from "@thirdweb-dev/react" }import { ThirdwebProvider as ThirdwebProviderV5 } from "thirdweb/react" <ThirdwebProvider activeChain={...} clientId={...}>  <ThirdwebProviderV5>     ...  </ThirdwebProviderV5></V4TWProvider>
```

`import{ ThirdwebProvider}from"@thirdweb-dev/react"}import{ ThirdwebProviderasThirdwebProviderV5 }from"thirdweb/react"<ThirdwebProvideractiveChain={...}clientId={...}><ThirdwebProviderV5>...</ThirdwebProviderV5></V4TWProvider>`From there, you can obtain the current signer using theuseSignerhook, and convert it when needed using theethers5Adapter:

`useSigner``ethers5Adapter````typescript
import { useSigner } from "@thirdweb-dev/react";import { ethers5Adapter } from "thirdweb/adapters/ethers5"; const signer = useSigner(); const onClick = async () => {    // convert the signer to used with the new SDK	const account = await ethers5Adapter.signer.fromEthers(signer);    // then use the new SDK normally    const transaction = prepareContractCall({ ... });    await sendTransaction({	    transaction,	    account,    });};
```

`import{ useSigner }from"@thirdweb-dev/react";import{ ethers5Adapter }from"thirdweb/adapters/ethers5";constsigner=useSigner();constonClick=async()=>{// convert the signer to used with the new SDKconstaccount=awaitethers5Adapter.signer.fromEthers(signer);// then use the new SDK normallyconsttransaction=prepareContractCall({...});awaitsendTransaction({transaction,account,});};`
## TypeScript Cheatsheet

| Task | @thirdweb-dev/sdk | thirdweb |
| ---- | ---- | ---- |
| Chains | import { Sepolia } from "@thirdweb-dev/chains" | import { sepolia } from "thirdweb/chains" |
| Wallets | import { MetaMaskWallet } from "@thirdweb-dev/wallets" | import { createWallet } from "thirdweb/wallets" |
| Initialize | new ThirdwebSDK(...) | createThirdwebClient({ ... }) |
| Contract | await sdk.getContract(...) | getContract(...) // no await |
| Read | await contract.call(...) | await readContract(...) |
| Prepare | await contract.prepare(...) | prepareContractCall(...) // no await |
| Send | await contract.call(...) | await sendTransaction(...) |
| Extensions | await contract.erc721.getAll() | await getNFTs(...) |
| Deploy | sdk.deployer.deployBuiltInContract(...) | await deployPublishedContract(...) |

`@thirdweb-dev/sdk``thirdweb``import { Sepolia } from "@thirdweb-dev/chains"``import { sepolia } from "thirdweb/chains"``import { MetaMaskWallet } from "@thirdweb-dev/wallets"``import { createWallet } from "thirdweb/wallets"``new ThirdwebSDK(...)``createThirdwebClient({ ... })``await sdk.getContract(...)``getContract(...) // no await``await contract.call(...)``await readContract(...)``await contract.prepare(...)``prepareContractCall(...) // no await``await contract.call(...)``await sendTransaction(...)``await contract.erc721.getAll()``await getNFTs(...)``sdk.deployer.deployBuiltInContract(...)``await deployPublishedContract(...)`
## React Cheatsheet

| Task | @thirdweb-dev/react | thirdweb |
| ---- | ---- | ---- |
| Provider | import { ThirdwebProvider} from @thirdweb-dev/react | import { ThirdwebProvider } from "thirdweb/react" |
| Contract | useContract(...) | getContract(...) // not a hook |
| Address | useAddress(...) | useActiveAccount(...) // account?.address |
| Read | useContractRead(...) | useReadContract(...) |
| Write | useContractWrite(...) | useSendTransaction() |
| Extensions | useNFTs(...) | useReadContract(getNFTs, { ... }) |
| Get Signer | useSigner() | useActiveAccount() |
| Get Wallet | useWallet() | useActiveWallet() |
| Button | Web3Button | TransactionButton |
| Connect | ConnectWallet | ConnectButton |
| Connection Status | useConnectionStatus() | useActiveWalletConnectionStatus() |
| Switch Chain | useSwitchChain() | useSwitchActiveWalletChain() |
| Get Connected Chain | useChain() | useActiveWalletChain() |

`@thirdweb-dev/react``thirdweb``import { ThirdwebProvider} from @thirdweb-dev/react``import { ThirdwebProvider } from "thirdweb/react"``useContract(...)``getContract(...) // not a hook``useAddress(...)``useActiveAccount(...) // account?.address``useContractRead(...)``useReadContract(...)``useContractWrite(...)``useSendTransaction()``useNFTs(...)``useReadContract(getNFTs, { ... })``useSigner()``useActiveAccount()``useWallet()``useActiveWallet()``Web3Button``TransactionButton``ConnectWallet``ConnectButton``useConnectionStatus()``useActiveWalletConnectionStatus()``useSwitchChain()``useSwitchActiveWalletChain()``useChain()``useActiveWalletChain()`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

