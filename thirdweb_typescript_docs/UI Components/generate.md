# Generating extensions

*Source: [https://portal.thirdweb.com/typescript/v5/extensions/generate](https://portal.thirdweb.com/typescript/v5/extensions/generate)*

You can generate precompiled, optimized extensions for any deployed contract using the thirdweb CLI.

The thirdweb SDK comes with a CLI that can be run with your package manager of choice.

```typescript
npx thirdweb generate <chainId>/<contract-address>
```

`npxthirdwebgenerate<chainId>/<contract-address>`This will generate a newthirdwebdirectory in your own project, containing the precompiled extension for the contract at the given address.

`thirdweb`
### Example: Generating an extension for a USDC contract on Optimism

```typescript
npx thirdweb generate 10/0x0b2c639c533813f4aa9d7837caf62653d097ff85
```

`npxthirdwebgenerate10/0x0b2c639c533813f4aa9d7837caf62653d097ff85`This will generate the following filethirdweb/10/0x0b2c639c533813f4aa9d7837caf62653d097ff85.tsin your project, containing:

`thirdweb/10/0x0b2c639c533813f4aa9d7837caf62653d097ff85.ts`
* Precompiled, type-safe event definitions
* Precompiled, type-safe function definitions

You can inspect the generated code, modify it, and use it in your project.

### Example: Using a generated extension function

```typescript
import { permit } from "/thirdweb/10/0x0b2c639c533813f4aa9d7837caf62653d097ff85"; const contract = getContract({	client,	chain: optimism,	address: USDC_ADDRESS,}); // Type-safe function to do a permit transactionconst transaction = permit({  owner: ...,  spender: ...,  value: ...,  deadline: ...,  signature: ...,});await sendTransaction({ transaction, account });
```

`import{ permit }from"/thirdweb/10/0x0b2c639c533813f4aa9d7837caf62653d097ff85";constcontract=getContract({client,chain: optimism,address:USDC_ADDRESS,});// Type-safe function to do a permit transactionconsttransaction=permit({owner:...,spender:...,value:...,deadline:...,signature:...,});awaitsendTransaction({ transaction, account });`
### Example: Using a generated event

```typescript
import { transferEvent } from "/thirdweb/10/0x0b2c639c533813f4aa9d7837caf62653d097ff85"; const contract = getContract({	client,	chain: optimism,	address: USDC_ADDRESS,}); // Type-safe event listenerconst events = await getContractEvents({  contract,  events: [    transferEvent({      from: ...,      to: ...,    })  ],});
```

`import{ transferEvent }from"/thirdweb/10/0x0b2c639c533813f4aa9d7837caf62653d097ff85";constcontract=getContract({client,chain: optimism,address:USDC_ADDRESS,});// Type-safe event listenerconstevents=awaitgetContractEvents({contract,events: [transferEvent({from:...,to:...,})],});`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

