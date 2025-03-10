# Preparing Transactions

*Source: [https://portal.thirdweb.com/typescript/v5/transactions/prepare](https://portal.thirdweb.com/typescript/v5/transactions/prepare)*

All transactions sent with the SDK need to be prepared first. Preparing a transaction is synchronous, lightweight and does not require any network requests. It also gives you type-safe definitions for your contract calls.

## Preparing a contract call

The recommended way to prepare a contract call is to pass the Solidity method signature and the params. This is type-safe based on the Solidity method signature you define. You can get your desired contract method signature from the solidity code directly.

```typescript
import { prepareContractCall, toWei } from "thirdweb"; const tx = prepareContractCall({  contract,  // Pass the method signature that you want to call  method: "function mintTo(address to, uint256 amount)",  // and the params for that method  // Their types are automatically inferred based on the method signature  params: ["0x123...", toWei("100")],});
```

`import{ prepareContractCall, toWei }from"thirdweb";consttx=prepareContractCall({contract,// Pass the method signature that you want to callmethod:"function mintTo(address to, uint256 amount)",// and the params for that method// Their types are automatically inferred based on the method signatureparams: ["0x123...",toWei("100")],});`This will return a prepared transaction object that is ready to be sent to the blockchain and can be acted on in various ways.

## Preparing a raw transaction

You can also create a raw transaction directly. This is useful when you want to send ether to an address for example, or when you already have encoded data.

```typescript
import { prepareTransaction, toWei } from "thirdweb"; const transaction = prepareTransaction({  // The account that will be the receiver  to: "0x456...",  // The value is the amount of ether you want to send with the transaction  value: toWei("1"),  // The chain to execute the transaction on  chain: defineChain(1),  // Your thirdweb client  client,});
```

`import{ prepareTransaction, toWei }from"thirdweb";consttransaction=prepareTransaction({// The account that will be the receiverto:"0x456...",// The value is the amount of ether you want to send with the transactionvalue:toWei("1"),// The chain to execute the transaction onchain:defineChain(1),// Your thirdweb clientclient,});`
## Other ways to prepare a transaction

There are few other ways to prepare a contract call, all of these return the same transaction object.

### Generating extension functions for a deployed contract

Using the CLI, you can generate optimized functions for all the possible calls to a contract. This saves you time and precomputes all the necessary encoding.

```typescript
npx thirdweb generate <contractId>/<contractAddress>
```

`npxthirdwebgenerate<contractId>/<contractAddress>`Read more on how togenerate extension functions using the CLI.

### Explicit Contract ABI

Another way to get type safety is to pass the full contract ABI togetContract. This will give you autocompletion for all methods declared in the ABI. There is a slight extract cost of having the full ABI in your code which can be pretty large.

`getContract````typescript
import { getContract, prepareContractCall, toWei } from "thirdweb"; const contract = getContract({  client,	chainId,  // The ABI for the contract is defined here  abi: [    ...    {      name: "mintTo",      inputs: [        {          type: "address",          name: "to",        },        {          type: "uint256",          name: "amount",        },      ],      type: "function",    }    ...  ],}); const tx = prepareContractCall({  contract,  // We get auto-completion for all the available functions on the contract ABI  method: "mintTo",  // including full type-safety for the params  params: ["0x123...", toWei("100")],});
```

`import{ getContract, prepareContractCall, toWei }from"thirdweb";constcontract=getContract({client,chainId,// The ABI for the contract is defined hereabi: [...{name:"mintTo",inputs: [{type:"address",name:"to",},{type:"uint256",name:"amount",},],type:"function",}...],});consttx=prepareContractCall({contract,// We get auto-completion for all the available functions on the contract ABImethod:"mintTo",// including full type-safety for the paramsparams: ["0x123...",toWei("100")],});`
### ABI snippet

As an alternative to passing the full ABI, you can pass a snippet of the ABI for the method you want to call. This is useful when you only want to call a single method and don't want to have the full ABI in your code.

```typescript
import { prepareContractCall, toWei } from "thirdweb"; const tx = prepareContractCall({  contract,  // Pass a snippet of the ABI for the method you want to call.  method: {    name: "mintTo",    inputs: [      {        type: "address",        name: "to",      },      {        type: "uint256",        name: "amount",      },    ],    type: "function",  },  // The Types of `params` are automatically inferred based on the ABI inputs.  params: ["0x123...", toWei("100")],});
```

`import{ prepareContractCall, toWei }from"thirdweb";consttx=prepareContractCall({contract,// Pass a snippet of the ABI for the method you want to call.method: {name:"mintTo",inputs: [{type:"address",name:"to",},{type:"uint256",name:"amount",},],type:"function",},// The Types of `params` are automatically inferred based on the ABI inputs.params: ["0x123...",toWei("100")],});`
### Automatic ABI Resolution

Finally, you can dynamically resolve contract methods at runtime using theresolveMethodfunction. This is the best way to handle contracts you don't know the ABI of in advance but it is also less performant and not type-safe.

`resolveMethod````typescript
import { prepareContractCall, resolveMethod, toWei } from "thirdweb";const tx = prepareContractCall({  contract,  // in this case we only pass the name of the method we want to call  method: resolveMethod("mintTo"),  // however using this method we lose type safety for our params  params: ["0x123...", toWei("100")],});
```

`import{ prepareContractCall, resolveMethod, toWei }from"thirdweb";consttx=prepareContractCall({contract,// in this case we only pass the name of the method we want to callmethod:resolveMethod("mintTo"),// however using this method we lose type safety for our paramsparams: ["0x123...",toWei("100")],});`
### Please note

This method is convenient, however, it is also:

* less performant at runtime (it has to resolve the ABI of the contract and then match the method name you provide)
* not type-safe (you lose type safety for your params)

There are cases where you specificallyneedto be able to resolve methods dynamically at runtime, in which case this method is useful.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

