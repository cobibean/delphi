# resolveImplementation

*Source: [https://portal.thirdweb.com/references/typescript/v5/resolveImplementation](https://portal.thirdweb.com/references/typescript/v5/resolveImplementation)*

* References
* resolveImplementation

Resolves the implementation address and bytecode for a given proxy contract.

## Example

`import{ resolveImplementation }from"thirdweb";constimplementation=awaitresolveImplementation(contract);`
#### Signature

`functionresolveImplementation(contract:Readonly<ContractOptions<any,`0x${string}`>>,):Promise<{address:string;bytecode:`0x${string}`}>;`
## Parameters

#### contract

The contract to resolve the implementation for.

### Type

`letcontract:Readonly<ContractOptions<any,`0x${string}`>>;`
## Returns

#### Return Type

`letreturnType:Promise<{address:string;bytecode:`0x${string}`}>;`A promise that resolves to an object containing the implementation address and bytecode.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

