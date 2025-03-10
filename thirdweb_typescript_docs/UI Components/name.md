# name

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/name](https://portal.thirdweb.com/references/typescript/v5/common/name)*

* References
* name

Retrieves the name associated with the given contract.

## Example

`import{ name }from"thirdweb/extensions/common";constcontractName=awaitname({ contract });`
#### Signature

`functionname(options:BaseTransactionOptions):Promise<string>;`
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

