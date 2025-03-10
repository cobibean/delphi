# extractMinimalProxyImplementationAddress

*Source: [https://portal.thirdweb.com/references/typescript/v5/extractMinimalProxyImplementationAddress](https://portal.thirdweb.com/references/typescript/v5/extractMinimalProxyImplementationAddress)*

* References
* extractMinimalProxyImplementationAddress

Extracts the implementation address from a given bytecode string if it matches any of the known minimal proxy patterns.

## Example

`import{ extractMinimalProxyImplementationAddress }from"thirdweb/utils";constbytecode="0x363d3d373d3d3d363d73...";constimplementationAddress=extractMinimalProxyImplementationAddress(bytecode);`
#### Signature

`functionextractMinimalProxyImplementationAddress(bytecode:string,):undefined|string;`
## Parameters

#### bytecode

The bytecode string to extract the implementation address from.

### Type

`letbytecode:string;`
## Returns

#### Return Type

`letreturnType:undefined|string;`The implementation address as a string if a match is found, otherwise undefined.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

