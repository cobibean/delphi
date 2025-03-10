# Using extensions

*Source: [https://portal.thirdweb.com/typescript/v5/extensions/use](https://portal.thirdweb.com/typescript/v5/extensions/use)*

## What are extensions?

Extensions are the most convenient way to interact with contracts and protocols.

They are precompiled, type-safe and highly optimized implementations of common standards such as ERC20, ERC721, ERC1155, etc. They can be handwritten to provide an easier API, sometimes combining multiple contract calls into one convenient function. They can also be generated from any deployed contract using asimple CLI command.

To use an extension, you just need to import it and call it with the necessary parameters.

### Example:getOwned()extension for ERC1155 tokens

`getOwned()`This read extension handles fetching all the tokens owned by an address. Under the hood, this combines multiple contract calls.

```typescript
import { getContract } from "thirdweb";import { getOwnedNFTs } from "thirdweb/extensions/erc1155"; // get the contractconst contract = getContract({...}); // since this is a read extension, we can just await the resultconst ownedNFTs = await getOwnedNFTs({	contract,	address: "0x5678...",});
```

`import{ getContract }from"thirdweb";import{ getOwnedNFTs }from"thirdweb/extensions/erc1155";// get the contractconstcontract=getContract({...});// since this is a read extension, we can just await the resultconstownedNFTs=awaitgetOwnedNFTs({contract,address:"0x5678...",});`
### Example:mintTo()extension for ERC721 tokens

`mintTo()`This extension handles uploading metadata to IPFS before minting an ERC721 token.

```typescript
import { getContract } from "thirdweb";import { mintTo } from "thirdweb/extensions/erc721"; // get the contractconst contract = getContract({...}); // call the extension function to prepare the transactionconst transaction = mintTo({	contract,	to: "0x5678...",    nft: {        name: "My NFT",        description: "This is my NFT",        image: "https://example.com/image.png",    },}); // Send the transactionconst transactionResult = await sendTransaction({  transaction,  account,});
```

`import{ getContract }from"thirdweb";import{ mintTo }from"thirdweb/extensions/erc721";// get the contractconstcontract=getContract({...});// call the extension function to prepare the transactionconsttransaction=mintTo({contract,to:"0x5678...",nft: {name:"My NFT",description:"This is my NFT",image:"https://example.com/image.png",},});// Send the transactionconsttransactionResult=awaitsendTransaction({transaction,account,});`
### Example:transfer()extension for ERC20 tokens

`transfer()`This extension conveniently handles unit conversion when transfering ERC20 tokens. You can pass the amount in tokens, the extension will convert it to the right unit before calling the contract.

```typescript
import { getContract, sendTransaction } from "thirdweb";import { transfer } from "thirdweb/extensions/erc20"; // get the contractconst contract = getContract({...}); // Call the extension function to prepare the transactionconst transaction = transfer({  contract,  to: "0x1234...",  amount: "0.01",}); // Send the transactionconst transactionResult = await sendTransaction({  transaction,  account,});
```

`import{ getContract, sendTransaction }from"thirdweb";import{ transfer }from"thirdweb/extensions/erc20";// get the contractconstcontract=getContract({...});// Call the extension function to prepare the transactionconsttransaction=transfer({contract,to:"0x1234...",amount:"0.01",});// Send the transactionconsttransactionResult=awaitsendTransaction({transaction,account,});`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

