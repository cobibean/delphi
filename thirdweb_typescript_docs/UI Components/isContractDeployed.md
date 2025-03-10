# isContractDeployed

*Source: [https://portal.thirdweb.com/references/typescript/v5/isContractDeployed](https://portal.thirdweb.com/references/typescript/v5/isContractDeployed)*

* References
* isContractDeployed

Checks if a contract is deployed by verifying its bytecode.

## Example

`import{ getContract }from"thirdweb/contract";import{ isContractDeployed }from"thirdweb/contract/utils";constcontract=getContract({...});constisDeployed=awaitisContractDeployed(contract);console.log(isDeployed);`
#### Signature

`functionisContractDeployed(contract:Readonly):Promise<boolean>;`
## Parameters

#### contract

The contract to check.

### Type

`letcontract:Readonly;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A promise that resolves to a boolean indicating whether the contract is deployed or not.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

