# extractIPFSUri

*Source: [https://portal.thirdweb.com/references/typescript/v5/extractIPFSUri](https://portal.thirdweb.com/references/typescript/v5/extractIPFSUri)*

* References
* extractIPFSUri

Extracts the IPFS URI from the given bytecode.

## Example

`import{ extractIPFSUri }from"thirdweb/utils/bytecode/extractIPFS";constbytecode="0x363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3";constipfsHash=extractIPFSUri(bytecode);console.log(ipfsHash);`
#### Signature

`functionextractIPFSUri(bytecode:string):undefined|string;`
## Parameters

#### bytecode

The bytecode to extract the IPFS URI from.

### Type

`letbytecode:string;`
## Returns

#### Return Type

`letreturnType:undefined|string;`The IPFS URI if found, otherwise undefined.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

