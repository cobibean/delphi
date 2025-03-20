# React Cheatsheet

This cheatsheet compares the React hook and component imports between the legacy `@thirdweb-dev/react` package and the new `thirdweb` package.

| Task                  | `@thirdweb-dev/react`                                                  | `thirdweb`                                               |
|-----------------------|------------------------------------------------------------------------|----------------------------------------------------------|
| **Provider**          | `import { ThirdwebProvider } from '@thirdweb-dev/react'`                | `import { ThirdwebProvider } from "thirdweb/react"`       |
| **Contract**          | `useContract(...)`                                                     | `getContract(...) // not a hook`                         |
| **Address**           | `useAddress(...)`                                                      | `useActiveAccount(...) // account?.address`             |
| **Read**              | `useContractRead(...)`                                                 | `useReadContract(...)`                                   |
| **Write**             | `useContractWrite(...)`                                                | `useSendTransaction()`                                   |
| **Extensions**        | `useNFTs(...)`                                                         | `useReadContract(getNFTs, { ... })`                        |
| **Get Signer**        | `useSigner()`                                                          | `useActiveAccount()`                                     |
| **Get Wallet**        | `useWallet()`                                                          | `useActiveWallet()`                                      |
| **Button**            | `Web3Button`                                                           | `TransactionButton`                                      |
| **Connect**           | `ConnectWallet`                                                        | `ConnectButton`                                          |
| **Connection Status** | `useConnectionStatus()`                                                | `useActiveWalletConnectionStatus()`                      |
| **Switch Chain**      | `useSwitchChain()`                                                     | `useSwitchActiveWalletChain()`                           |
| **Get Connected Chain** | `useChain()`                                                         | `useActiveWalletChain()`                                 |

*Source: [thirdweb Docs](https://portal.thirdweb.com/typescript/v5/migrate)*
