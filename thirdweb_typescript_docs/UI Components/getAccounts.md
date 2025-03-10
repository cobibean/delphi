# getAccounts

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/getAccounts](https://portal.thirdweb.com/references/typescript/v5/erc4337/getAccounts)*

* References
* getAccounts

Calls the "getAccounts" function on the contract.

## Example

`import{ getAccounts }from"thirdweb/extensions/erc4337";constresult=awaitgetAccounts({contract,start:...,end:...,});`
#### Signature

`functiongetAccounts(options:BaseTransactionOptions<GetAccountsParams>):Promise<readonlyArray<string>>`
## Parameters

#### options

The options for the getAccounts function.

### Type

`letoptions:BaseTransactionOptions<GetAccountsParams>;`
## Returns

#### Return Type

`letreturnType:Promise<readonlyArray<string>>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

