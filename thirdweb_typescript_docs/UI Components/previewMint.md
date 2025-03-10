# previewMint

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4626/previewMint](https://portal.thirdweb.com/references/typescript/v5/erc4626/previewMint)*

* References
* previewMint

Calls the "previewMint" function on the contract.

## Example

`import{ previewMint }from"thirdweb/extensions/erc4626";constresult=awaitpreviewMint({contract,shares:...,});`
#### Signature

`functionpreviewMint(options:BaseTransactionOptions<PreviewMintParams>,):Promise<bigint>;`
## Parameters

#### options

The options for the previewMint function.

### Type

`letoptions:BaseTransactionOptions<PreviewMintParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

