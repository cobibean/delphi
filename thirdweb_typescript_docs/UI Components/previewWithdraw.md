# previewWithdraw

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4626/previewWithdraw](https://portal.thirdweb.com/references/typescript/v5/erc4626/previewWithdraw)*

* References
* previewWithdraw

Calls the "previewWithdraw" function on the contract.

## Example

`import{ previewWithdraw }from"thirdweb/extensions/erc4626";constresult=awaitpreviewWithdraw({contract,assets:...,});`
#### Signature

`functionpreviewWithdraw(options:BaseTransactionOptions<PreviewWithdrawParams>,):Promise<bigint>;`
## Parameters

#### options

The options for the previewWithdraw function.

### Type

`letoptions:BaseTransactionOptions<PreviewWithdrawParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

