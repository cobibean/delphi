# resolve

*Source: [https://portal.thirdweb.com/references/typescript/v5/lens/resolve](https://portal.thirdweb.com/references/typescript/v5/lens/resolve)*

* References
* resolve

Calls the "resolve" function on the contract.

## Example

`import{ resolve }from"thirdweb/extensions/lens";constresult=awaitresolve({contract,handleId:...,});`
#### Signature

`functionresolve(options:BaseTransactionOptions<ResolveParams>,):Promise<bigint>;`
## Parameters

#### options

The options for the resolve function.

### Type

`letoptions:BaseTransactionOptions<ResolveParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

