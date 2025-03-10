# readContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/readContract](https://portal.thirdweb.com/references/typescript/v5/readContract)*

* References
* readContract

### Reads state from a deployed smart contract.

Use this for raw read calls from a contract, but you can also use readextensionsfor predefined methods for common standards.

## Example

### Raw contract call (recommended)

You can read from any contract by using the solidity signature of the function you want to call.

`import{ getContract }from"thirdweb";import{ sepolia }from"thirdweb/chains";import{ useReadContract }from"thirdweb/react";constcontract=getContract({client,address:"0x...",chain: sepolia,});const{data,isLoading}=useReadContract({contract,method:"function tokenURI(uint256 tokenId) returns (string)",params: [1n],});`Note that this is type safe, the params types will be enforced based on the signature.

### Raw contract call withresolveMethod

`resolveMethod`If you don't have the solidity signature of the function you want to call, you can use theresolveMethodhelper to resolve the method from any deployed contract.

`resolveMethod`Note that this is not type safe, and will also have a 1 time overhead of resolving the contract ABI.

`import{ getContract, resolveMethod }from"thirdweb";import{ sepolia }from"thirdweb/chains";import{ useReadContract }from"thirdweb/react";constcontract=getContract({client,address:"0x...",chain: sepolia,});const{data,isLoading}=useReadContract({contract,method:resolveMethod("tokenURI"),params: [1n],});`
#### Signature

`functionreadContract(options:ReadContractOptions<TAbi,TMethod,TPreparedMethod>,):Promise<ReadContractResult<TPreparedMethod[2]>>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:ReadContractOptions<TAbi,TMethod,TPreparedMethod>;`
## Returns

#### Return Type

`letreturnType:outputsextends{length:0}?never:outputsextends{length:1}?AbiParametersToPrimitiveTypes<outputs>[0]:AbiParametersToPrimitiveTypes<outputs>;`A promise that resolves with the result of the read call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

