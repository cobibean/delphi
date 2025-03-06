# thirdweb TypeScript SDK Documentation

The **thirdweb TypeScript SDK** is a performant and lightweight library designed to interact seamlessly with any EVM-compatible blockchain across Node.js, React, and React Native.

## Installation

Install via your preferred package manager:

```bash
npm install thirdweb
# or
yarn add thirdweb
pnpm add thirdweb
bun add thirdweb
```

## Quickstart Guide

### 1. Create a thirdweb Client

Obtain a Client ID by creating a project on [thirdweb dashboard](https://thirdweb.com/create-api-key). Add it to your `.env`:

```env
THIRDWEB_SECRET_KEY=[YOUR_SECRET_KEY]
WALLET_PRIVATE_KEY=[YOUR_PRIVATE_KEY]
```

Create a thirdweb client:

```typescript
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.THIRDWEB_SECRET_KEY,
});
```

**Note:** Use `clientId` for client-side and `secretKey` for server-side scripts. Do not expose your `secretKey` in client-side code.

### Creating a Wallet

```typescript
import { privateKeyToAccount } from "thirdweb/wallets";

const account = privateKeyToAccount({
  client,
  privateKey: process.env.WALLET_PRIVATE_KEY,
});

console.log("Connected as", account.address);
```

### Check Wallet Balance

```typescript
import { getWalletBalance } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";

const balance = await getWalletBalance({ account, chain: sepolia });
console.log(`Balance: ${balance.displayValue} ${balance.symbol}`);
```

### Sending Transactions

```typescript
import { getContract, sendTransaction } from "thirdweb";
import { transfer } from "thirdweb/extensions/erc20";

const contract = getContract({
  client,
  address: "0x1234...",
  chain: sepolia,
});

const transaction = transfer({
  contract,
  to: "0xRecipientAddress...",
  amount: "100"
});

const result = await sendTransaction({ transaction, account });
console.log(`Transaction hash: ${result.transactionHash}`);
```

### Interacting with NFTs

```typescript
import { getOwnedNFTs } from "thirdweb/extensions/erc1155";

const ownedNFTs = await getOwnedNFTs({ contract, address: account.address });
console.log("Owned NFTs:", ownedNFTs);
```

### Generic Contract Calls

```typescript
import { prepareContractCall } from "thirdweb";
import { toWei } from "thirdweb/utils";

const transaction = prepareContractCall({
  contract,
  method: "function mintTo(address to, uint256 amount)",
  params: ["0xRecipientAddress...", toWei("10")],
});

const result = await sendTransaction({ transaction, account });
console.log(`Mint transaction hash: ${result.transactionHash}`);
```

## Features

- **React & React Native UI Components:** Wallet connections, transactions, etc.
- **In-app Wallets:** Email and social login supported.
- **Account Abstraction:** ERC4337 smart accounts.
- **Type-safe API:** Typed contract interaction.
- **Code Generation:** CLI-generated optimized contract interfaces.
- **RPC for Any EVM Chain:** Easily connect using chain IDs.
- **IPFS Integration:** Efficient IPFS interactions.
- **Auto ABI Resolution:** Automatically fetch ABIs.
- **Interoperability:** Compatible with ethers.js and viem.

## Best Practices & Principles

- **Single package:** Usable across multiple environments (Node, React).
- **Performance:** Optimized for speed.
- **Developer Friendly:** Type-safe and predictable.
- **Security:** Protect keys and sensitive information; avoid exposure of `secretKey` on client-side.

For more details, visit the [official documentation](https://portal.thirdweb.com/typescript/v5).

