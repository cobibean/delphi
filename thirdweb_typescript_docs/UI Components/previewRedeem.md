# previewRedeem

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4626/previewRedeem](https://portal.thirdweb.com/references/typescript/v5/erc4626/previewRedeem)*

* References
* previewRedeem

Calls the "previewRedeem" function on the contract.

## Example

`import{ previewRedeem }from"thirdweb/extensions/erc4626";constresult=awaitpreviewRedeem({contract,shares:...,});`
#### Signature

`functionpreviewRedeem(options:BaseTransactionOptions<PreviewRedeemParams>,):Promise<bigint>;`
## Parameters

#### options

The options for the previewRedeem function.

### Type

`letoptions:BaseTransactionOptions<PreviewRedeemParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

