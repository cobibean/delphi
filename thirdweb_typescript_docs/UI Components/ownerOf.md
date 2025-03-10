# ownerOf

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/ownerOf](https://portal.thirdweb.com/references/typescript/v5/erc721/ownerOf)*

* References
* ownerOf

Calls the "ownerOf" function on the contract.

## Example

`import{ ownerOf }from"thirdweb/extensions/erc721";constresult=awaitownerOf({contract,tokenId:...,});`
#### Signature

`functionownerOf(options:BaseTransactionOptions<OwnerOfParams>,):Promise<string>;`
## Parameters

#### options

The options for the ownerOf function.

### Type

`letoptions:BaseTransactionOptions<OwnerOfParams>;`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

