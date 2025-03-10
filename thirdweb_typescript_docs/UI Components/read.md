# Reading contract state

*Source: [https://portal.thirdweb.com/typescript/v5/transactions/read](https://portal.thirdweb.com/typescript/v5/transactions/read)*

The recommended way to read the contract state is to use thereadContractfunction and pass the Solidity method signature and the params. This is type-safe based on the Solidity method signature you define. You can get your desired contract method signature from the solidity code directly.

`readContract````typescript
import { readContract } from "thirdweb"; const balance = await readContract({  contract: contract,  method: "function balanceOf(address) view returns (uint256)",  params: ["0x123..."],});
```

`import{ readContract }from"thirdweb";constbalance=awaitreadContract({contract: contract,method:"function balanceOf(address) view returns (uint256)",params: ["0x123..."],});`This will execute the read immediately and return the result from the blockchain.

## Reading contract events

The recommended way to read the contract events is to use thegetContractEventsfunction and passing a prepared event with the Solidity event signature and the params. This is type-safe based on the Solidity event signature you define. You can get your desired contract event signature from the solidity code directly.

`getContractEvents````typescript
import { getContractEvents, prepareEvent } from "thirdweb"; const myEvent = prepareEvent({  signature:    "event Transfer(address indexed from, address indexed to, uint256 value)",}); const events = await getContractEvents({  contract: myContract,  events: [myEvent],  blockRange: 1000,});
```

`import{ getContractEvents, prepareEvent }from"thirdweb";constmyEvent=prepareEvent({signature:"event Transfer(address indexed from, address indexed to, uint256 value)",});constevents=awaitgetContractEvents({contract: myContract,events: [myEvent],blockRange:1000,});`
### Generating all read functions and events for a deployed contract

Using the CLI, you can generate optimized functions for all the possible calls to a contract. This saves you time and precomputes all the necessary encoding.

```typescript
npx thirdweb generate <contractId>/<contractAddress>
```

`npxthirdwebgenerate<contractId>/<contractAddress>`Read more on how togenerate extension functions using the CLI.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

