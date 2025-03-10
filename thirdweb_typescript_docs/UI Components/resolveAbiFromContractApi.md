# resolveAbiFromContractApi

*Source: [https://portal.thirdweb.com/references/typescript/v5/resolveAbiFromContractApi](https://portal.thirdweb.com/references/typescript/v5/resolveAbiFromContractApi)*

* References
* resolveAbiFromContractApi

Resolves the ABI (Application Binary Interface) for a contract from the contract API.

## Example

`import{ createThirdwebClient, getContract }from"thirdweb";import{ resolveAbiFromContractApi }from"thirdweb/contract";import{ ethereum }from"thirdweb/chains";constclient=createThirdwebClient({ clientId:"..."});constmyContract=getContract({client,address:"...",chain: ethereum,});constabi=awaitresolveAbiFromContractApi(myContract);`
#### Signature

`functionresolveAbiFromContractApi(contract:Readonly<ContractOptions<any,`0x${string}`>>,contractApiBaseUrl:string,):Promise<Abi>;`
## Parameters

#### contract

The ThirdwebContract instance representing the contract.

### Type

`letcontract:Readonly<ContractOptions<any,`0x${string}`>>;`
#### contractApiBaseUrl

The base URL of the contract API. Defaults to "https://contract.thirdweb.com/abi".

### Type

`letcontractApiBaseUrl:string;`
## Returns

#### Return Type

`letreturnType:readonlyArray<(AbiConstructor)|(AbiError)|(AbiEvent)|(AbiFallback)|(AbiFunction)|(AbiReceive)>`A promise that resolves to the ABI of the contract.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

