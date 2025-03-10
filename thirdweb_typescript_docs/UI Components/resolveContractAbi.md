# resolveContractAbi

*Source: [https://portal.thirdweb.com/references/typescript/v5/resolveContractAbi](https://portal.thirdweb.com/references/typescript/v5/resolveContractAbi)*

* References
* resolveContractAbi

Resolves the ABI (Application Binary Interface) for a given contract.
If the ABI is already cached, it returns the cached value.
Otherwise, it tries to resolve the ABI from the contract's API.
If that fails, it resolves the ABI from the contract's bytecode.

## Example

`import{ createThirdwebClient, getContract }from"thirdweb";import{ resolveContractAbi }from"thirdweb/contract";import{ ethereum }from"thirdweb/chains";constclient=createThirdwebClient({ clientId:"..."});constmyContract=getContract({client,address:"...",chain: ethereum,});constabi=awaitresolveContractAbi(myContract);`
#### Signature

`functionresolveContractAbi(contract:Readonly<ContractOptions<abi,`0x${string}`>>,contractApiBaseUrl:string,):Promise<abi>;`
## Parameters

#### contract

The contract for which to resolve the ABI.

### Type

`letcontract:Readonly<ContractOptions<abi,`0x${string}`>>;`
#### contractApiBaseUrl

The base URL of the contract API. Defaults to "https://contract.thirdweb.com/abi".

### Type

`letcontractApiBaseUrl:string;`
## Returns

#### Return Type

`letreturnType:Promise<abi>;`A promise that resolves to the ABI of the contract.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

