# isERC721

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/isERC721](https://portal.thirdweb.com/references/typescript/v5/erc721/isERC721)*

* References
* isERC721

Check if a contract supports the ERC721 interface.

## Example

`import{ isERC721 }from"thirdweb/extensions/erc721";constresult=awaitisERC721({ contract });`
#### Signature

`functionisERC721(options:BaseTransactionOptions):Promise<boolean>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A boolean indicating whether the contract supports the ERC721 interface.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

