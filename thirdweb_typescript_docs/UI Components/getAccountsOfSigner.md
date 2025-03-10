# getAccountsOfSigner

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/getAccountsOfSigner](https://portal.thirdweb.com/references/typescript/v5/erc4337/getAccountsOfSigner)*

* References
* getAccountsOfSigner

Calls the "getAccountsOfSigner" function on the contract.

## Example

`import{ getAccountsOfSigner }from"thirdweb/extensions/erc4337";constresult=awaitgetAccountsOfSigner({contract,signer:...,});`
#### Signature

`functiongetAccountsOfSigner(options:BaseTransactionOptions<GetAccountsOfSignerParams>):Promise<readonlyArray<string>>`
## Parameters

#### options

The options for the getAccountsOfSigner function.

### Type

`letoptions:BaseTransactionOptions<GetAccountsOfSignerParams>;`
## Returns

#### Return Type

`letreturnType:Promise<readonlyArray<string>>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

