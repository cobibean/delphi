# getBytecode

*Source: [https://portal.thirdweb.com/references/typescript/v5/getBytecode](https://portal.thirdweb.com/references/typescript/v5/getBytecode)*

* References
* getBytecode

Retrieves the bytecode of a contract.

## Example

`import{ getBytecode }from"thirdweb/contract";constbytecode=awaitgetBytecode(contract);`
#### Signature

`functiongetBytecode(contract:Readonly):Promise<`0x${string}`>;`
## Parameters

#### contract

The ThirdwebContract instance.

### Type

`letcontract:Readonly;`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`A Promise that resolves to the bytecode of the contract.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

