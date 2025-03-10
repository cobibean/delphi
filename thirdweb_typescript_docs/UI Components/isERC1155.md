# isERC1155

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/isERC1155](https://portal.thirdweb.com/references/typescript/v5/erc1155/isERC1155)*

* References
* isERC1155

Check if a contract supports the ERC1155 interface.

## Example

`import{ isERC1155 }from"thirdweb/extensions/erc1155";constresult=awaitisERC1155({ contract });`
#### Signature

`functionisERC1155(options:BaseTransactionOptions):Promise<boolean>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A boolean indicating whether the contract supports the ERC1155 interface.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

