# predictAccountAddress

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/predictAccountAddress](https://portal.thirdweb.com/references/typescript/v5/erc4337/predictAccountAddress)*

* References
* predictAccountAddress

Calls the "getAddress" function on the contract.

## Example

`import{ getAddress }from"thirdweb/extensions/erc4337";constresult=awaitgetAddress({contract,adminSigner:...,data:...,});`
#### Signature

`functionpredictAccountAddress(options:BaseTransactionOptions<GetAddressParams>,):Promise<string>;`
## Parameters

#### options

The options for the getAddress function.

### Type

`letoptions:BaseTransactionOptions<GetAddressParams>;`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

