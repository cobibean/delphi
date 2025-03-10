# resolveMethod

*Source: [https://portal.thirdweb.com/references/typescript/v5/resolveMethod](https://portal.thirdweb.com/references/typescript/v5/resolveMethod)*

* References
* resolveMethod

Resolves and returns the ABI function with the specified method name.
Throws an error if the function is not found in the ABI.

## Example

`import{ resolveMethod, prepareContractCall }from"thirdweb";consttx=prepareContractCall({contract,// automatically resolves the necessary abi to encode the transactionmethod:resolveMethod("transfer"),// however there is no type completion for params in this case (as the resolution is async and happens at runtime)params: [to, value],});`
#### Signature

`functionresolveMethod(method:string,):(contract:Readonly<ContractOptions<TAbi,`0x${string}`>>,)=>Promise<AbiFunction>;`
## Parameters

#### method

The name of the method to resolve.

### Type

`letmethod:string;`
## Returns

#### Return Type

`letreturnType:(contract:Readonly<ContractOptions<TAbi,`0x${string}`>>,)=>Promise<AbiFunction>;`The resolved ABI function.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

