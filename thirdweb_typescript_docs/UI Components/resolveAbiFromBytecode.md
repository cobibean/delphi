# resolveAbiFromBytecode

*Source: [https://portal.thirdweb.com/references/typescript/v5/resolveAbiFromBytecode](https://portal.thirdweb.com/references/typescript/v5/resolveAbiFromBytecode)*

* References
* resolveAbiFromBytecode

Resolves the ABI (Application Binary Interface) from the bytecode of a contract.

## Example

`import{ createThirdwebClient, getContract }from"thirdweb";import{ resolveAbiFromBytecode }from"thirdweb/contract";import{ ethereum }from"thirdweb/chains";constclient=createThirdwebClient({ clientId:"..."});constmyContract=getContract({client,address:"...",chain: ethereum,});constabi=awaitresolveAbiFromBytecode(myContract);`
#### Signature

`functionresolveAbiFromBytecode(contract:Readonly<ContractOptions<any,`0x${string}`>>,):Promise<Abi>;`
## Parameters

#### contract

The ThirdwebContract instance.

### Type

`letcontract:Readonly<ContractOptions<any,`0x${string}`>>;`
## Returns

#### Return Type

`letreturnType:readonlyArray<(AbiConstructor)|(AbiError)|(AbiEvent)|(AbiFallback)|(AbiFunction)|(AbiReceive)>`The resolved ABI as a generic type.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

