# nonces

*Source: [https://portal.thirdweb.com/references/typescript/v5/lens/nonces](https://portal.thirdweb.com/references/typescript/v5/lens/nonces)*

* References
* nonces

Calls the "nonces" function on the contract.

## Example

`import{ nonces }from"thirdweb/extensions/lens";constresult=awaitnonces({contract,signer:...,});`
#### Signature

`functionnonces(options:BaseTransactionOptions<NoncesParams>,):Promise<bigint>;`
## Parameters

#### options

The options for the nonces function.

### Type

`letoptions:BaseTransactionOptions<NoncesParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

