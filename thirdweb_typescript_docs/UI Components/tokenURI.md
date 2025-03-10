# tokenURI

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/tokenURI](https://portal.thirdweb.com/references/typescript/v5/erc721/tokenURI)*

* References
* tokenURI

Calls the "tokenURI" function on the contract.

## Example

`import{ tokenURI }from"thirdweb/extensions/erc721";constresult=awaittokenURI({contract,tokenId:...,});`
#### Signature

`functiontokenURI(options:BaseTransactionOptions<TokenURIParams>,):Promise<string>;`
## Parameters

#### options

The options for the tokenURI function.

### Type

`letoptions:BaseTransactionOptions<TokenURIParams>;`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

