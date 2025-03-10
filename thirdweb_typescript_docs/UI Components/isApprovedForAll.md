# isApprovedForAll

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/isApprovedForAll](https://portal.thirdweb.com/references/typescript/v5/erc721/isApprovedForAll)*

* References
* isApprovedForAll

Calls the "isApprovedForAll" function on the contract.

## Example

`import{ isApprovedForAll }from"thirdweb/extensions/erc721";constresult=awaitisApprovedForAll({contract,owner:...,operator:...,});`
#### Signature

`functionisApprovedForAll(options:BaseTransactionOptions<IsApprovedForAllParams>,):Promise<boolean>;`
## Parameters

#### options

The options for the isApprovedForAll function.

### Type

`letoptions:BaseTransactionOptions<IsApprovedForAllParams>;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

