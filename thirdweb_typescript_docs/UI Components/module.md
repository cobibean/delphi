# module

*Source: [https://portal.thirdweb.com/references/typescript/v5/transferableerc721/module](https://portal.thirdweb.com/references/typescript/v5/transferableerc721/module)*

* References
* module

Convenience function to add the TransferableERC721 module as a default module on a core contract.

## Example

`import{TransferableERC721,deployModularContract,}from"thirdweb/modules";constdeployed=deployModularContract({client,chain,account,core:"ERC721",params: {name:"My Modular Contract",},modules: [TransferableERC721.module()],});`
#### Signature

`functionmodule(params?:{publisher?:string;}):(args:{account:Account;chain:Readonly;client:ThirdwebClient;})=>Promise<{data:"0x";module:`0x${string}`}>;`
## Parameters

#### params

The parameters for the module.

### Type

`letparams:{publisher?:string};`
## Returns

#### Return Type

`letreturnType:(args:{account:Account;chain:Readonly;client:ThirdwebClient;})=>Promise<{data:"0x";module:`0x${string}`}>;`
* The module function.

The module function.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

