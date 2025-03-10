# prepareContractCall

*Source: [https://portal.thirdweb.com/references/typescript/v5/prepareContractCall](https://portal.thirdweb.com/references/typescript/v5/prepareContractCall)*

* References
* prepareContractCall

Prepares a contract call by resolving the ABI function, parameters and encoded data. Optionally specify other properties such as value or gas price.

## Example

### Usage with a human-readable method signature:

`import{ prepareContractCall }from"thirdweb";consttransaction=prepareContractCall({contract,method:"function transfer(address to, uint256 value)",params: [to, value],});`
### Usage with explicit gas price and/or value:

`import{ prepareContractCall }from"thirdweb";import{ toWei }from"thirdweb/utils";consttransaction=prepareContractCall({contract,method:"function transfer(address to, uint256 value)",params: [to, value],maxFeePerGas:30n,maxPriorityFeePerGas:1n,value:toWei("0.01"),});`
### Usage with ERC20 value:

For transactions that transfer ERC20 tokens, you can specify the value as the amount of tokens to transfer.

You can use this in conjuction with thegetApprovalForTransactionfunction to easily create approval transactions for ERC20 tokens.

`getApprovalForTransaction`This value will also be read by the react hooks and UI components to present to total cost to the user.

`import{ prepareContractCall }from"thirdweb";import{ toWei }from"thirdweb/utils";consttransaction=prepareContractCall({contract,method:"function payWithCoin()",params: [],erc20Value: {tokenAddress:"0x...",// the address of the ERC20 tokenamountWei:toWei("0.1"),// the amount of tokens to transfer in wei},});`
### Usage with a JSON ABI function object:

`import{ prepareContractCall }from"thirdweb";consttransaction=prepareContractCall({contract,method: {name:"transfer",type:"function",inputs: [{ name:"to", type:"address"},{ name:"value", type:"uint256"},],outputs: [],stateMutability:"payable",},params: [to, value],});`
### Usage with the ABI defined on the contract:

`import{ getContract, prepareContractCall }from"thirdweb";constcontract=getContract({...,// chain, address, clientabi: [...]// ABI with a "transfer" method});consttransaction=prepareContractCall({contract,method:"transfer",// <- this gets inferred from the contractparams: [to, value],});`
### Passing extra call data to the transaction

`import{ getContract, prepareContractCall }from"thirdweb";constcontract=getContract({...,// chain, address, client});consttransaction=prepareContractCall({contract,method:"function transfer(address to, uint256 value)",params: [...],// The extra call data MUST be encoded to hex before passingextraCallData:"0x......."});`
#### Signature

`functionprepareContractCall(options:PrepareContractCallOptions<TAbi,TMethod,TPreparedMethod>,):PreparedTransaction<TAbi,ParseMethod<TAbi,TMethod>,PrepareTransactionOptions>;`
## Parameters

#### options

The options for preparing the contract call.

### Type

`letoptions:PrepareContractCallOptions<TAbi,TMethod,TPreparedMethod>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<TAbi,ParseMethod<TAbi,TMethod>,PrepareTransactionOptions>;`A promise that resolves to the prepared transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

