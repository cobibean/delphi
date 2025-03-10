# getAllAccounts

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/getAllAccounts](https://portal.thirdweb.com/references/typescript/v5/erc4337/getAllAccounts)*

* References
* getAllAccounts

Calls the "getAllAccounts" function on the contract.

## Example

`import{ getAllAccounts }from"thirdweb/extensions/erc4337";constresult=awaitgetAllAccounts({contract,});`
#### Signature

`functiongetAllAccounts(options:BaseTransactionOptions):Promise<readonlyArray<string>>`
## Parameters

#### options

The options for the getAllAccounts function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<readonlyArray<string>>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

