# tokenDataOf

*Source: [https://portal.thirdweb.com/references/typescript/v5/lens/tokenDataOf](https://portal.thirdweb.com/references/typescript/v5/lens/tokenDataOf)*

* References
* tokenDataOf

Calls the "tokenDataOf" function on the contract.

## Example

`import{ tokenDataOf }from"thirdweb/extensions/lens";constresult=awaittokenDataOf({contract,tokenId:...,});`
#### Signature

`functiontokenDataOf(options:BaseTransactionOptions<TokenDataOfParams>,):Promise<{mintTimestamp:bigint;owner:string}>;`
## Parameters

#### options

The options for the tokenDataOf function.

### Type

`letoptions:BaseTransactionOptions<TokenDataOfParams>;`
## Returns

#### Return Type

`letreturnType:Promise<{mintTimestamp:bigint;owner:string}>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

