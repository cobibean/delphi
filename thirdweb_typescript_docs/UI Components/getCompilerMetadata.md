# getCompilerMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/getCompilerMetadata](https://portal.thirdweb.com/references/typescript/v5/getCompilerMetadata)*

* References
* getCompilerMetadata

Down the compiled metadata from thirdweb contract api and format it

## Example

`import{ getCompilerMetadata, getContract }from"thirdweb/contracts";constcontract=getContract({address:"0x...",chain: ethereum,client:"",});constmetadata=awaitgetCompilerMetadata(contract);`
#### Signature

`functiongetCompilerMetadata(contract:Readonly,):Promise<CompilerMetadata>;`
## Parameters

#### contract

### Type

`letcontract:Readonly;`
## Returns

#### Return Type

`letreturnType:Promise<CompilerMetadata>;`The compiler metadata for the contract

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

