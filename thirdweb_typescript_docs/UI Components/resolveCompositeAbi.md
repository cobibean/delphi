# resolveCompositeAbi

*Source: [https://portal.thirdweb.com/references/typescript/v5/resolveCompositeAbi](https://portal.thirdweb.com/references/typescript/v5/resolveCompositeAbi)*

* References
* resolveCompositeAbi

Resolves the ABI for a contract based on its bytecode.
If the contract follows the plugin-pattern or dynamic pattern, it resolves the ABIs for the plugins and merges them with the root ABI.
If the contract follows the base router pattern, it resolves the ABIs for the plugins and merges them with the root ABI.
If the contract follows the diamond pattern, it resolves the ABIs for the facets and merges them with the root ABI.

## Example

`import{ createThirdwebClient, getContract }from"thirdweb";import{ resolveCompositeAbiFromBytecode }from"thirdweb/contract";import{ ethereum }from"thirdweb/chains";constclient=createThirdwebClient({ clientId:"..."});constmyContract=getContract({client,address:"...",chain: ethereum,});constabi=awaitresolveCompositeAbiFromBytecode(myContract);`
#### Signature

`functionresolveCompositeAbi(contract:Readonly,rootAbi?:Abi,resolveSubAbi?:(contract:Readonly)=>Promise<Abi>,):Promise<Abi>;`
## Parameters

#### contract

The contract for which to resolve the ABI.

### Type

`letcontract:Readonly;`
#### rootAbi

The root ABI to use for the contract. If not provided, it resolves the ABI from the contract's bytecode.

### Type

`letrootAbi:readonlyArray<(AbiConstructor)|(AbiError)|(AbiEvent)|(AbiFallback)|(AbiFunction)|(AbiReceive)>`
#### resolveSubAbi

A function to resolve the ABI for a sub-contract. If not provided, it uses the default ABI resolution logic.

### Type

`letresolveSubAbi:(contract:Readonly)=>Promise<Abi>;`
## Returns

#### Return Type

`letreturnType:readonlyArray<(AbiConstructor)|(AbiError)|(AbiEvent)|(AbiFallback)|(AbiFunction)|(AbiReceive)>`The resolved ABI for the contract.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

