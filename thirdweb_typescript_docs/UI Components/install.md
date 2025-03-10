# install

*Source: [https://portal.thirdweb.com/references/typescript/v5/transferableerc721/install](https://portal.thirdweb.com/references/typescript/v5/transferableerc721/install)*

* References
* install

Installs the TransferableERC721 module on a core contract.

## Example

`import{ TransferableERC721 }from"thirdweb/modules";consttransaction=TransferableERC721.install({contract: coreContract,account: account,});awaitsendTransaction({transaction,account,});`
#### Signature

`functioninstall(options:{account:Account;contract:Readonly;params?:{publisher?:string};}):PreparedTransaction;`
## Parameters

#### options

### Type

`letoptions:{account:Account;contract:Readonly;params?:{publisher?:string};};`
## Returns

#### Return Type

`letreturnType:Readonly<options>&{__contract?:ThirdwebContract<abi>;__preparedMethod?:()=>Promise<PreparedMethod<abiFn>>;};`the transaction to install the module

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

