# ensureBytecodePrefix

*Source: [https://portal.thirdweb.com/references/typescript/v5/ensureBytecodePrefix](https://portal.thirdweb.com/references/typescript/v5/ensureBytecodePrefix)*

* References
* ensureBytecodePrefix

Ensures that the given bytecode has the correct prefix.
If the bytecode already starts with "0x", it is returned as is.
Otherwise, the prefix "0x" is added to the bytecode.

## Example

`import{ ensureBytecodePrefix }from"thirdweb/utils/bytecode/prefix";constbytecode="363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3";constprefixedBytecode=ensureBytecodePrefix(bytecode);console.log(prefixedBytecode);`
#### Signature

`functionensureBytecodePrefix(bytecode:string):`0x${string}`;`
## Parameters

#### bytecode

The bytecode to ensure the prefix for.

### Type

`letbytecode:string;`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`The bytecode with the correct prefix.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

