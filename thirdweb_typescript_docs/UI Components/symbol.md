# symbol

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/symbol](https://portal.thirdweb.com/references/typescript/v5/common/symbol)*

* References
* symbol

Retrieves the name associated with the given contract.

## Example

`import{ symbol }from"thirdweb/extensions/common";constcontractSymbol=awaitsymbol({ contract });`
#### Signature

`functionsymbol(options:BaseTransactionOptions):Promise<string>;`
## Parameters

#### options

The options for the transaction.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<string>;`A promise that resolves to the name associated with the contract.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

