# Interacting with a Modular Contract

*Source: [https://portal.thirdweb.com/typescript/v5/modular/interact](https://portal.thirdweb.com/typescript/v5/modular/interact)*

There are core contracts for ERC20, ERC721 and ERC1155 standards. Those follow the standard ERCs and can be interacted with like usual with the standard extensions.

The interesting part is to interact with an attached module. This is done by using the defined module name spaced API for that module.

```typescript
import { ClaimableERC721 } from "thirdweb/modules"; const transaction = ClaimableERC721.mint({  contract,  to: "0x...", // Address to mint tokens to  quantity: 2, // Amount of tokens to mint}); // Send the transactionawait sendTransaction({ transaction, account });
```

`import{ ClaimableERC721 }from"thirdweb/modules";consttransaction=ClaimableERC721.mint({contract,to:"0x...",// Address to mint tokens toquantity:2,// Amount of tokens to mint});// Send the transactionawaitsendTransaction({ transaction, account });`You can view all the prebuilt modules available in themodules reference.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

